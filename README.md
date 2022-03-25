# Generating the IDEAL KEYBOAD LAYOUT with TypeScript

node.js required.

```
npm install
```
```
npm build
```
```
node ./dist/evaluate.js
```
```
node ./dist/search.js
```

After that, you may want to:

1. Update `config.txt` to your preference.

2. Change `text` in `evaluate.ts` to configure what kind of sentences you want to use to evaluate the layout.

3. Blush up parameters at `create_cost()` in `calc.ts` to make the method better.