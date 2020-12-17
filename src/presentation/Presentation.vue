<template>
  <fancy-slideshow>
    <!-- -->
    <fancy-slideshow-slide
        no-title
    >
      <text-sub-sub-headline>
        第31回 社内定期技術勉強会
      </text-sub-sub-headline>
      <text-sub-headline>
        「Vue.jsの基礎」
      </text-sub-headline>
    </fancy-slideshow-slide>

    <!-- -->
    <fancy-slideshow-slide
      title="自己紹介"
    >
      <text-headline>
        宮地 孝輔
      </text-headline>
      <text-normal>
        所属：Skyスタイル推進課<br />
        社歴：2018年度 新卒入社（現在3年目）
      </text-normal>

      <text-sub-sub-headline>
        最近のお仕事 ... パートナー勤務表システムの実装
      </text-sub-sub-headline>

      <text-sub-headline>
        <div>
          &lt; 好きな技術・興味のある技術 &gt;
        </div>
        Haskell, PureScript, 関数型プログラミング, DDD
      </text-sub-headline>
    </fancy-slideshow-slide>

    <!-- -->
    <fancy-slideshow-slide
        title="本セッションについて"
    >
      <div>
        <text-sub-sub-headline>
          想定対象者
        </text-sub-sub-headline>
        <text-normal>
          <ul>
            <li>JavaScriptのコーディング経験はあり、基本的なシンタックスは知っている(ES6くらいまで)</li>
            <li>Vue.jsに興味があるが、ほとんど/まったく触ったことがない</li>
          </ul>
        </text-normal>
      </div>

      <div>
        <text-sub-sub-headline>
          本日のゴール
        </text-sub-sub-headline>
        <ul>
          <li>Vueの基礎概念を理解し、単純なアプリを実装できるようになる<br />
            👉 コンポーネント（props、data、computed）、ライフサイクル、親子コンポーネント間の通信
          </li>
        </ul>
      </div>
    </fancy-slideshow-slide>

    <!------------------------------------------------------------------>
    <fancy-slideshow-chapter
        name="basic-concepts"
        title="基礎概念"
    >
      <fancy-slideshow-slide
        title="Vue.jsとは！？"
      >
      </fancy-slideshow-slide>

      <fancy-slideshow-slide
        title="Vueはコンポーネント指向"
      >
      </fancy-slideshow-slide>

      <fancy-slideshow-slide
        title="コンポーネント = 構造 + 振る舞い + 見た目"
      >
      </fancy-slideshow-slide>

      <fancy-slideshow-slide
        title="仮想DOM"
      >
      </fancy-slideshow-slide>

      <fancy-slideshow-slide
        title="リアクティブシステム"
      >
      </fancy-slideshow-slide>

    </fancy-slideshow-chapter>

    <!------------------------------------------------------------------>
    <fancy-slideshow-chapter
        name="component-basics"
        title="コンポーネントの基本"
    >
      <fancy-slideshow-slide title="単一ファイルコンポーネント">
      </fancy-slideshow-slide>

      <fancy-slideshow-slide title="テンプレート構文">
      </fancy-slideshow-slide>

      <fancy-slideshow-slide title="コンポーネントオプション">
      </fancy-slideshow-slide>

      <fancy-slideshow-slide title="コンポーネントオプション: props">
      </fancy-slideshow-slide>

      <fancy-slideshow-slide title="コンポーネントオプション: data">
      </fancy-slideshow-slide>

      <fancy-slideshow-slide title="コンポーネントオプション: computed">
      </fancy-slideshow-slide>

      <fancy-slideshow-slide title="コンポーネントオプション: methods">
      </fancy-slideshow-slide>

      <fancy-slideshow-slide title="ライフサイクルフック">
      </fancy-slideshow-slide>
    </fancy-slideshow-chapter>

    <!------------------------------------------------------------------>
    <fancy-slideshow-chapter
        name="parent-child-communication"
        title="親子コンポーネント間通信"
    >
      <fancy-slideshow-slide title="イベントハンドリング">
      </fancy-slideshow-slide>
    </fancy-slideshow-chapter>

    <!------------------------------------------------------------------>
    <fancy-slideshow-slide
      no-title
    >
      <img
          src="@/assets/end.jpeg"
          alt="end-card"
      />
    </fancy-slideshow-slide>
  </fancy-slideshow>
</template>

<script>

export default {
  name: "Presentation",
  components: {}
}
</script>

<style scoped>

</style>