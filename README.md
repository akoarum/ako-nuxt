# Ako Nuxt

## Usage

### 1. インストール

```
$ cd ako-nuxt
$ yarn
```

### 2. Webサーバーの立ち上げ

```
$ yarn dev
```

## Scripts

|コマンド|説明|
|:---|:---|
|`yarn dev`|開発サーバーの起動（localhost:3000）|
|`yarn build:dev`|アプリケーションを開発環境用にWebpackでビルド|
|`yarn build:prod`|アプリケーションを本番環境用にWebpackでビルド|
|`yarn start`|プロダクションモードでサーバーを起動|
|`yarn generate:dev`|アプリケーションを開発環境用にWビルドしてルートごとにHTMLを作成。静的ファイルホスティングに使用。|
|`yarn generate:prod`|アプリケーションを本番環境用にWビルドしてルートごとにHTMLを作成。静的ファイルホスティングに使用。|
|`yarn test`|Jestによるテストの実行。|
|`yarn storybook`|Storybookの起動。 (localhost:9000)|
|`yarn build-storybook`|Storybookのビルド。|
|`yarn lint`|ESLintの実行。|
|`yarn lintfix`|ESLintによるコードの自動整形。|

## Code Layout

```
.storybook/    Storybook設定ファイル
app/           Nuxt.jsアプリケーション用ファイル
  assets/      Sass、JavaScript、画像（要コンパイル）などコンパイルされていないファイル
  components/  コンポーネント
  layouts/     アプリケーションのレイアウトファイル
  middleware/  アプリケーションのミドルウェア
  pages/       アプリケーションのビュー、ルーティングファイル
  plugins/     Vue.jsアプリケーションのインスタンス化前に実行するプラグイン。Vue.filterなど
  static/      静的ファイル。robots.txtなど
  store/       Vuexストア
config/        環境設定ファイル
  dev.env.js   開発環境用の設定ファイル
  prod.env.js  本番環境用の設定ファイル
stories/       Storybookのファイル
test/          テスト用のspecファイル
.babelrc
.eslintrc.js
nuxt.config.js
package.json
```

## DesignSystem

**Atomic Design** を採用する。  
コンポーネントを下記のカテゴリに分類し構築する。

- **Atoms**：これ以上分割できない最小限のコンポーネント。HTMLの1要素程度を目安とする。
- **Molecules**：Atomsを組み合わせて作る、1UIを構成する。
- **Organisms**：Atoms、Molecules、他のOrganismsから構成される1グループ。単独で1つのセクションを表す。

**Templates** については本プロジェクトでは使用しない。  
また **pages** はNuxt.jsの `pages` に割り当てる。

### 制約

|カテゴリ|依存関係|ストアアクセス|APIアクセス|関数の所持|
|:---|:---|:---|:---|:---|
|Atoms|なし|NG|NG|NG|
|Molecules|Atoms|NG|NG|OK（ただし自身で解決すべきもののみ）|
|Organisms|Atoms、Molecules、Organisms|NG|NG|OK|
|Pages|Organisms|OK|OK|OK|

- ストア、APIへのアクセスはPagesのみとし、OrganismsはPagesから渡されたpropsを振り分ける役目を担う
- ローカルステートは **Atomsも含め** 、持たなければならない場合にのみ持つことができる。ただし極力持たずに済む方法を模索すること

## Naming Convention

### コンポーネント名

- **atoms** に関してはHTMLの要素名と衝突する可能性があるため、 `VXxx` と先頭に `V` を付ける
- その他は分かりやすい名前を使用する

### HTMLクラス名

- コンポーネントはScoped CSSを使用するため、名前の付け方は自由
- ただし、子要素（コンポーネント）にクラス名をつける場合は **BEM記法** に則って `[コンポーネント名]__[名前]` とする
- Modifierは `-[名前]` と先頭に `-` を付ける

## Coding Standards

### Vue.js / Nuxt.js

#### mixinsの範囲限定

コンポーネントの構成が複雑になることを避けるため、他のコンポーネントを `mixins` に当てることを禁止する。  
関数やスタイルを共通化させたい同類のコンポーネントのみ下記のルールで `mixins` を使用することができる。

- コンポーネント名でディレクトリを用意する
- 中に `Presenter.vue` と `style.scss` を用意し、それぞれ共通の定義やスタイルを記述する
- 上記ファイルをimportしたいコンポーネントを同ディレクトリ内に定義する

```
components/
  atoms/
    VButton/
      VButton.vue     -> mixins に Presenter を指定、styleに styles.scss を import
      VButtonLink.vue -> mixins に Presenter を指定、styleに styles.scss を import
      Presenter.vue
      style.scss
```

#### extendsの使用禁止

`extends` はコンポーネントの管理が複雑になり、崩壊する恐れがあるため使用しない。
