# Pagination

```example
<script>
  import { pagination, page, cols, col } from "@svelkit/spectre";
</script>

<div use:cols>
  <div use:col={[12,6]}>
    <ul use:pagination>
      <li use:page.item>
        <a href="#pagination">Prev</a>
      </li>
      <li use:page.item>
        <a href="#pagination">1</a>
      </li>
      <li use:page.item><span>...</span></li>
      <li use:page.item>
        <a href="#pagination">4</a>
      </li>
      <li use:page.item={"active"}>
        <a href="#pagination">5</a>
      </li>
      <li use:page.item>
        <a href="#pagination">6</a>
      </li>
      <li use:page.item><span>...</span></li>
      <li use:page.item>
        <a href="#pagination">9</a>
      </li>
      <li use:page.item>
        <a href="#pagination">Next</a>
      </li>
    </ul>
  </div>
  <div use:col={[12,6]}>
    <ul use:pagination>
      <li use:page.item={"disabled"}>
        <a href="#pagination" tabindex="-1">Prev</a>
      </li>
      <li use:page.item={"active"}>
        <a href="#pagination">1</a>
      </li>
      <li use:page.item>
        <a href="#pagination">2</a>
      </li>
      <li use:page.item>
        <a href="#pagination">3</a>
      </li>
      <li use:page.item><span>...</span></li>
      <li use:page.item>
        <a href="#pagination">9</a>
      </li>
      <li use:page.item>
        <a href="#pagination">Next</a>
      </li>
    </ul>
  </div>
</div>
```

Add the `use:pagination` action to a container element. And add the `use:page.item` to the child elements. The `page.item` with the `active` property will be highlighted. You can pass the `disabled` property to the `page.item` action to have unclickable page item links.

```example
<script>
  import { pagination, page, cols, col, h5 } from "@svelkit/spectre";
</script>

<div use:cols>
  <div use:col>
    <ul use:pagination>
      <li use:page.item={"prev"}>
        <a href="#pagination">
          <div use:page.item={"subtitle"}>Previous</div>
          <div use:page.item={"title"} use:h5>Getting started</div>
        </a>
      </li>
      <li use:page.item use:page.next>
        <a href="#page">
          <div use:page={"subtitle"}>Next</div>
          <div use:page.item={"title"} use:h5>Layout</div>
        </a>
      </li>
    </ul>
  </div>
</div>
```

You could use `use:page.prev` and `use:page.next` pagination to navigate.
