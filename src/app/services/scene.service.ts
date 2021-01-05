import { Injectable } from '@angular/core';
import {
  BoxBufferGeometry,
  Color,
  DirectionalLight,
  DirectionalLightHelper,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

@Injectable({
  providedIn: 'root',
})
export class SceneService {
  constructor() {}

  initRender(rendererContainer: HTMLElement) {
    // シーン作成
    const scene = new Scene();

    // 背景色の設定
    scene.background = new Color('skyblue');

    // カメラのオプション設定
    const fov = 35;
    const aspect =
      rendererContainer.clientWidth / rendererContainer.clientHeight;
    const near = 0.1;
    const far = 100;

    // カメラ作成
    const camera = new PerspectiveCamera(fov, aspect, near, far);

    // カメラの位置の初期設定は(0, 0, 0)なので、位置を指定
    camera.position.set(0, 0, 10);

    // ジオメトリ作成
    const width = 2;
    const height = 2;
    const depth = 2;
    const geometry = new BoxBufferGeometry(width, height, depth);

    // デフォルト（白）の基本的なマテリアル作成（今回は紫）
    const material = new MeshStandardMaterial({ color: 'purple' });

    // ジオメトリとマテリアルを合わせてメッシュを作成
    const cube = new Mesh(geometry, material);

    // キューブの向きを変更
    cube.rotation.set(-0.5, -0.1, 0.8);

    // 照明の作成
    const light = new DirectionalLight('white', 8);
    light.position.set(10, 10, 0);

    // 照明を可視化するヘルパー
    const lightHelper = new DirectionalLightHelper(light);

    // メッシュと照明をシーンに追加
    scene.add(cube, light, lightHelper);

    const renderer = new WebGLRenderer();

    renderer.setSize(
      rendererContainer.clientWidth,
      rendererContainer.clientHeight
    );

    // デバイスのピクセル値を設定
    renderer.setPixelRatio(window.devicePixelRatio);

    // containerのエレメント内にレンダラーcanvasを生成する
    rendererContainer.append(renderer.domElement);

    renderer.render(scene, camera);
  }
}
