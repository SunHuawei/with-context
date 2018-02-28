# with-context
Best practice for new React Context API

## Why with-context?
1. Make the usage more easier, consider it as your best practice
2. Tiny, only 1.8k before compressed

## Live Demo
Check here for online live demo: [https://jqkyy1oyv.codesandbox.io/](https://jqkyy1oyv.codesandbox.io/)

## How to install

```bash
npm i --save with-context
```
## Simple Usage

You could use `with-context` as a decorator -- `@withContext(SomeContext)` -- on your leaf components.

Here is a example, you may have a file `withTheme.js`

```jsx
import { withContext } from "with-context";

export const ThemeContext = React.createContext("light");
export const withTheme = withContext(ThemeContext, "theme");
```

And then, use `withTheme` as a decorator on your leaf component `LeafComponent.js`. 

Then you could simply use `this.props.theme` in that component.

```jsx
import { withTheme } from "./withTheme";
import { styles } from "../consts";

@withTheme
export default class LeafComponent extends React.PureComponent {
  render() {
    const { theme } = this.props;
    return (
      <div style={styles[theme]}>LeafComponent with theme: {theme}</div>
    );
  }
}
```

## Apply multiple context
You also could apply multiple context by this API -- `@withMultiContext({theme: ThemeContext, lang: LangContext})`.

Here is a example, you could have a file `withThemeAndI18n.js`
```jsx
import { withMultiContext } from "with-context";

export const ThemeContext = React.createContext("light");
export const LangContext = React.createContext("en");
export const withThemeAndI18n = withMultiContext({
  theme: ThemeContext,
  lang: LangContext
});
```

And then for a leaf component `LeafComponent.js`, you could use `const { theme, lang } = this.props`.

```jsx
import { withThemeAndI18n } from "./withThemeAndI18n";
import { styles, langs } from "../consts";

@withThemeAndI18n
export default class LeafComponent extends React.PureComponent {
  render() {
    const { theme, lang } = this.props;
    const langSet = langs[lang];
    return (
      <div style={styles[theme]}>
        <p>with theme: {langSet && langSet[theme]}</p>
        <p>with lang: {lang}</p>
      </div>
    );
  }
}
```

## Work with stateless functional component

`with-context` also works with stateless functional component. For example.

```jsx
import { withTheme } from "./withTheme";
import { styles } from "../consts";

const StatelessFunctionalComponent = ({ theme }) => {
  return (
    <div style={styles[theme]}>
      StatelessFunctionalComponent with theme: {theme}
    </div>
  );
};

export default withTheme(StatelessFunctionalComponent);
```