const response = await Bun.build({
    entrypoints: ['src/index.tsx'],
    outdir: './out',
    target: 'browser'
})


console.log(response.logs)