import { ClassConstructor, ClassMirror } from '@quicker-js/class-decorator';
import { EntityMetadata } from '../../metadatas';

/**
 * scene
 */
export class Scene<T extends {} = any> implements SceneImpl<T> {
  /**
   * 构造函数
   * @param value
   * @param type
   * @param elementType
   * @param subScene
   */
  public constructor(
    public readonly value: any,
    public readonly type: ClassConstructor<T>,
    public readonly elementType?: ClassConstructor,
    public readonly subScene?: string
  ) {}

  /**
   * 查看是否匹配
   * @param value
   */
  public match(value: any): boolean {
    return this.value === value;
  }

  /**
   * 创建实例
   * @param option
   */
  public static create<T>(option: SceneImpl<T>): Scene {
    return new Scene<T>(
      option.value,
      option.type,
      option.elementType,
      option.subScene
    );
  }

  /**
   * 解析缓存
   */
  private static caches = new Map<ClassConstructor, Scene[]>();

  /**
   * 通过对象创建
   * @param scenes
   */
  public static from(...scenes: SceneImpl[]): Scene[] {
    return scenes.map((item) => Scene.create(item));
  }

  /**
   * 通过类型创建
   * @param types
   */
  public static fromTypes(...types: ClassConstructor[]): Scene[] {
    const list: Scene[] = [];
    types.forEach((type) => {
      const caches = Scene.caches.get(type);
      if (caches) {
        list.push(...caches);
      } else {
        const classMirror = ClassMirror.reflect(type);
        const metadataFlags: Scene[] = [];
        classMirror.allMetadata.forEach((e) => {
          if (e instanceof EntityMetadata && e.metadata && e.metadata.scenes) {
            e.metadata.scenes.map((scene: Omit<SceneImpl, 'elementType'>) => {
              const instance = Scene.create({
                type: scene.type || type,
                elementType: scene.type !== type ? type : undefined,
                subScene: scene.subScene,
                value: scene.value,
              });
              list.push(instance);
              metadataFlags.push(instance);
            });
          }
        });
        Scene.caches.set(type, metadataFlags);
      }
    });
    return list;
  }
}

export interface SceneImpl<T extends {} = any> {
  value: any;
  type: ClassConstructor<T>;
  elementType?: ClassConstructor;
  subScene?: any;
}
