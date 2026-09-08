# Recharts — guide complet pour débuter avec React et TypeScript

Ce guide explique comment créer et personnaliser des graphiques avec **Recharts** dans une application React. Les exemples utilisent TypeScript et sont adaptés à une application de gestion de budget.

Le projet utilise actuellement **Recharts 3.10.1**.

Documentation officielle :

- Guide : https://recharts.github.io/en-US/guide/
- API complète : https://recharts.github.io/en-US/api/
- Exemples : https://recharts.github.io/en-US/examples/

## 1. À quoi sert Recharts ?

Recharts permet de construire des graphiques en assemblant des composants React.

Un graphique est généralement constitué de :

- un composant principal, par exemple `LineChart` ;
- un tableau de données fourni avec la prop `data` ;
- un axe horizontal `XAxis` ;
- un axe vertical `YAxis` ;
- une ou plusieurs séries, par exemple `Line` ou `Bar` ;
- des composants optionnels comme `Tooltip`, `Legend` et `CartesianGrid`.

Exemple de structure :

```tsx
<LineChart data={data}>
  <CartesianGrid />
  <XAxis />
  <YAxis />
  <Tooltip />
  <Legend />
  <Line />
</LineChart>
```

Chaque élément a donc un rôle précis. Le composant principal organise le graphique et ses enfants décrivent ce qui doit apparaître.

## 2. Installation

Depuis le dossier `frontend` :

```bash
npm install recharts
```

Recharts est déjà présent dans ce projet. Il n’est donc pas nécessaire de relancer cette commande sauf après une suppression des dépendances.

## 3. Comprendre le format des données

Recharts attend généralement un tableau d’objets :

```ts
const data = [
  { mois: 'Janvier', entrees: 1800, sorties: 950 },
  { mois: 'Février', entrees: 1650, sorties: 1100 },
  { mois: 'Mars', entrees: 2100, sorties: 1250 },
]
```

Chaque objet représente un point ou une catégorie du graphique.

Dans cet exemple :

- `mois` sert de libellé sur l’axe horizontal ;
- `entrees` contient les valeurs de la première série ;
- `sorties` contient les valeurs de la seconde série.

La prop `dataKey` indique à Recharts quelle propriété lire :

```tsx
<XAxis dataKey="mois" />
<Line dataKey="entrees" />
<Line dataKey="sorties" />
```

La valeur de `dataKey` doit correspondre exactement à une clé des objets. Une faute comme `dataKey="entrée"` alors que la clé s’appelle `entrees` produit une série vide.

### Typage TypeScript conseillé

```ts
type MonthlyFinance = {
  mois: string
  entrees: number
  sorties: number
}

const data: MonthlyFinance[] = [
  { mois: 'Janvier', entrees: 1800, sorties: 950 },
  { mois: 'Février', entrees: 1650, sorties: 1100 },
]
```

Les valeurs destinées aux calculs doivent rester des nombres. Il vaut mieux stocker `1800` et ajouter `€` lors de l’affichage plutôt que stocker la chaîne `'1800 €'`.

## 4. Tracer une première courbe

Voici un composant complet :

```tsx
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const data = [
  { mois: 'Jan', entrees: 1800, sorties: 950 },
  { mois: 'Fév', entrees: 1650, sorties: 1100 },
  { mois: 'Mar', entrees: 2100, sorties: 1250 },
  { mois: 'Avr', entrees: 1950, sorties: 900 },
]

export const FinanceLineChart = () => {
  return (
    <div className="h-80 w-full">
      <LineChart
        data={data}
        responsive
        margin={{ top: 20, right: 20, bottom: 10, left: 0 }}
        style={{ width: '100%', height: '100%' }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="mois" />
        <YAxis width="auto" />
        <Tooltip />
        <Legend />

        <Line
          type="monotone"
          dataKey="entrees"
          name="Entrées"
          stroke="#059669"
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="sorties"
          name="Sorties"
          stroke="#dc2626"
          strokeWidth={3}
        />
      </LineChart>
    </div>
  )
}
```

### Explication ligne par ligne

- `data={data}` transmet les données au graphique.
- `responsive` demande au graphique de suivre la taille disponible.
- `style={{ width: '100%', height: '100%' }}` lui donne la taille de son parent.
- Le parent utilise `h-80` car un graphique responsive a besoin d’une hauteur réelle.
- `margin` ajoute de l’espace à l’intérieur du graphique autour de la zone de tracé.
- `CartesianGrid` affiche la grille de lecture.
- `XAxis dataKey="mois"` utilise la propriété `mois` pour les libellés horizontaux.
- `YAxis` affiche l’échelle numérique.
- `Tooltip` affiche les valeurs au survol.
- `Legend` explique la signification des couleurs.
- Chaque `Line` affiche une série numérique.

## 5. Le composant `LineChart`

`LineChart` est le conteneur d’un graphique en courbes.

Props importantes :

- `data` : tableau d’objets à représenter ;
- `width` et `height` : dimensions fixes en pixels lorsque le graphique n’est pas responsive ;
- `responsive` : adapte le graphique à son conteneur dans Recharts 3 ;
- `style` : styles CSS, utiles pour fournir `width` et `height` ;
- `margin` : espace autour de la zone de tracé ;
- `onClick`, `onMouseEnter`, `onMouseLeave` : événements optionnels ;
- `syncId` : synchronise plusieurs graphiques partageant le même identifiant ;
- `accessibilityLayer` : active l’aide à l’accessibilité, activée par défaut.

Exemple de marge :

```tsx
margin={{
  top: 20,
  right: 30,
  bottom: 20,
  left: 10,
}}
```

## 6. Le composant `Line`

`Line` trace une courbe à partir d’une propriété numérique.

```tsx
<Line
  type="monotone"
  dataKey="solde"
  name="Solde"
  stroke="#4f46e5"
  strokeWidth={3}
  dot={{ r: 4 }}
  activeDot={{ r: 7 }}
  connectNulls
/>
```

Props importantes :

- `dataKey` : propriété numérique à lire ;
- `name` : nom affiché dans la légende et l’infobulle ;
- `type` : forme de la courbe ;
- `stroke` : couleur de la ligne ;
- `strokeWidth` : épaisseur de la ligne ;
- `strokeDasharray="5 5"` : transforme la ligne en pointillés ;
- `dot` : affiche ou configure les points ;
- `activeDot` : configure le point actuellement survolé ;
- `connectNulls` : relie les points séparés par une valeur `null` ;
- `hide` : masque la série ;
- `unit=" €"` : précise l’unité dans les éléments compatibles ;
- `isAnimationActive` : active ou désactive l’animation ;
- `label` : affiche une valeur près de chaque point ;
- `yAxisId` : associe la série à un axe vertical précis.

Valeurs courantes de `type` :

- `linear` : segments droits ;
- `monotone` : courbe fluide qui évite généralement les oscillations excessives ;
- `natural` : courbe plus arrondie ;
- `step` : courbe en escalier ;
- `stepBefore` et `stepAfter` : variantes de la courbe en escalier.

## 7. Les axes `XAxis` et `YAxis`

### `XAxis`

```tsx
<XAxis
  dataKey="mois"
  tick={{ fill: '#64748b', fontSize: 12 }}
  tickLine={false}
  axisLine={false}
  padding={{ left: 10, right: 10 }}
/>
```

Props importantes :

- `dataKey` : propriété utilisée comme catégorie ;
- `type="category"` : axe catégoriel, valeur habituelle pour les dates ou noms ;
- `type="number"` : axe numérique ;
- `tick` : style ou composant personnalisé des libellés ;
- `tickFormatter` : fonction de formatage ;
- `tickLine` : affiche ou masque les petits traits ;
- `axisLine` : affiche ou masque la ligne principale ;
- `angle` : incline les libellés ;
- `textAnchor` : règle leur alignement après rotation ;
- `interval` : contrôle la fréquence des libellés ;
- `padding` : espace au début et à la fin de l’axe ;
- `height` : hauteur de l’axe, avec `"auto"` disponible dans les versions récentes.

Exemple pour raccourcir une date :

```tsx
<XAxis
  dataKey="date"
  tickFormatter={(value: string) =>
    new Date(value).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
    })
  }
/>
```

### `YAxis`

```tsx
<YAxis
  width="auto"
  domain={[0, 'auto']}
  tickFormatter={(value: number) => `${value} €`}
/>
```

Props importantes :

- `domain` : limites minimale et maximale ;
- `tickFormatter` : formate les nombres affichés ;
- `allowDecimals={false}` : interdit les graduations décimales ;
- `width` : largeur réservée aux libellés ;
- `orientation="right"` : place l’axe à droite ;
- `hide` : cache l’axe ;
- `yAxisId` : identifiant utilisé avec plusieurs axes.

Exemples de `domain` :

```tsx
<YAxis domain={[0, 'auto']} />
<YAxis domain={['dataMin', 'dataMax']} />
<YAxis domain={[0, 5000]} />
```

## 8. `CartesianGrid`

La grille facilite la lecture des valeurs.

```tsx
<CartesianGrid
  stroke="#e2e8f0"
  strokeDasharray="3 3"
  vertical={false}
/>
```

Props importantes :

- `stroke` : couleur ;
- `strokeDasharray` : style des pointillés ;
- `horizontal` : affiche les lignes horizontales ;
- `vertical` : affiche les lignes verticales.

Une grille discrète est généralement plus lisible qu’une grille très sombre.

## 9. `Tooltip`

`Tooltip` affiche les informations au survol ou lors de la navigation au clavier.

```tsx
<Tooltip
  formatter={(value: number | string, name: string) => [
    `${Number(value).toLocaleString('fr-FR')} €`,
    name,
  ]}
  labelFormatter={(label) => `Période : ${label}`}
  contentStyle={{
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
  }}
/>
```

Props importantes :

- `formatter` : formate chaque valeur et son nom ;
- `labelFormatter` : formate le titre de l’infobulle ;
- `separator` : texte placé entre le nom et la valeur ;
- `contentStyle` : style de la boîte ;
- `labelStyle` : style du titre ;
- `itemStyle` : style de chaque série ;
- `cursor` : personnalise ou désactive la zone de survol ;
- `content` : remplace entièrement le contenu par un composant personnalisé ;
- `shared` : choisit, pour les graphiques compatibles, entre toutes les valeurs d’une catégorie et un seul élément.

### Tooltip personnalisé

```tsx
type CustomTooltipProps = {
  active?: boolean
  label?: string
  payload?: Array<{
    name?: string
    value?: number
    color?: string
  }>
}

const CustomTooltip = ({ active, label, payload }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
      <p className="mb-2 font-semibold text-slate-900">{label}</p>
      {payload.map((item) => (
        <p key={item.name} style={{ color: item.color }}>
          {item.name} : {item.value?.toLocaleString('fr-FR')} €
        </p>
      ))}
    </div>
  )
}
```

Utilisation :

```tsx
<Tooltip content={<CustomTooltip />} />
```

## 10. `Legend`

`Legend` explique les couleurs et les séries.

```tsx
<Legend
  iconType="circle"
  layout="horizontal"
  verticalAlign="bottom"
/>
```

Props importantes :

- `iconType` : forme du symbole (`circle`, `line`, `square`, etc.) ;
- `layout` : disposition horizontale ou verticale ;
- `content` : légende personnalisée ;
- `formatter` : formate le nom d’une série ;
- `wrapperStyle` : style du conteneur.

Sur Recharts 3.10, la prop `position` peut aussi servir à positionner plus précisément la légende.

## 11. Rendre un graphique responsive

### Méthode moderne avec Recharts 3

```tsx
<div className="h-80 w-full">
  <LineChart
    data={data}
    responsive
    style={{ width: '100%', height: '100%' }}
  >
    {/* composants du graphique */}
  </LineChart>
</div>
```

### Méthode avec `ResponsiveContainer`

```tsx
import { ResponsiveContainer } from 'recharts'

<div className="h-80 w-full">
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      {/* composants du graphique */}
    </LineChart>
  </ResponsiveContainer>
</div>
```

`ResponsiveContainer` observe la taille de son parent. Le parent doit donc avoir une largeur et surtout une hauteur mesurables. Sans `h-80`, `height: 320px`, `aspect-ratio` ou autre hauteur réelle, le graphique peut ne rien afficher.

N’utilisez pas obligatoirement les deux méthodes à la fois. Dans ce projet sous Recharts 3, la prop `responsive` est suffisante dans la majorité des cas.

## 12. Les principaux types de graphiques

### `LineChart` — courbe

À utiliser pour montrer une évolution continue dans le temps : solde quotidien, entrées mensuelles, évolution des dépenses.

Composant de série : `Line`.

### `AreaChart` — courbe avec surface

À utiliser pour insister sur le volume ou l’évolution globale.

```tsx
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

<AreaChart
  data={data}
  responsive
  style={{ width: '100%', height: '100%' }}
>
  <CartesianGrid strokeDasharray="3 3" vertical={false} />
  <XAxis dataKey="mois" />
  <YAxis width="auto" />
  <Tooltip />
  <Area
    type="monotone"
    dataKey="sorties"
    name="Dépenses"
    stroke="#4f46e5"
    fill="#c7d2fe"
    fillOpacity={0.6}
  />
</AreaChart>
```

Props utiles de `Area` : `dataKey`, `stroke`, `fill`, `fillOpacity`, `type`, `stackId` et `connectNulls`.

### `BarChart` — barres

À utiliser pour comparer des catégories : dépenses par catégorie ou entrées contre sorties par mois.

```tsx
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'

<BarChart
  data={data}
  responsive
  style={{ width: '100%', height: '100%' }}
  barGap={8}
>
  <CartesianGrid strokeDasharray="3 3" vertical={false} />
  <XAxis dataKey="mois" />
  <YAxis width="auto" />
  <Tooltip />
  <Legend />
  <Bar dataKey="entrees" name="Entrées" fill="#059669" radius={[6, 6, 0, 0]} />
  <Bar dataKey="sorties" name="Sorties" fill="#dc2626" radius={[6, 6, 0, 0]} />
</BarChart>
```

Props utiles de `Bar` :

- `dataKey` : valeur à afficher ;
- `fill` : couleur de remplissage ;
- `radius` : arrondi des coins ;
- `barSize` : largeur fixe ;
- `maxBarSize` : largeur maximale ;
- `stackId` : empile les barres ayant le même identifiant ;
- `label` : affiche les valeurs.

Exemple empilé :

```tsx
<Bar dataKey="loyer" stackId="depenses" fill="#4f46e5" />
<Bar dataKey="courses" stackId="depenses" fill="#8b5cf6" />
```

### `PieChart` — diagramme circulaire

À utiliser pour montrer la répartition d’un total : part du budget par catégorie.

```tsx
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'

const categoryData = [
  { name: 'Logement', value: 800 },
  { name: 'Alimentation', value: 350 },
  { name: 'Loisirs', value: 180 },
]

const colors = ['#4f46e5', '#7c3aed', '#2563eb']

<PieChart
  responsive
  style={{ width: '100%', height: '100%' }}
>
  <Pie
    data={categoryData}
    dataKey="value"
    nameKey="name"
    innerRadius={60}
    outerRadius={100}
    paddingAngle={3}
  >
    {categoryData.map((item, index) => (
      <Cell key={item.name} fill={colors[index % colors.length]} />
    ))}
  </Pie>
  <Tooltip />
  <Legend />
</PieChart>
```

Props importantes de `Pie` :

- `data` : données du cercle ;
- `dataKey` : valeur numérique ;
- `nameKey` : nom de chaque portion ;
- `innerRadius` : rayon intérieur, supérieur à zéro pour créer un donut ;
- `outerRadius` : rayon extérieur ;
- `startAngle` et `endAngle` : orientation ;
- `paddingAngle` : espace entre les portions ;
- `label` : affiche les libellés.

### `ComposedChart` — graphique combiné

Il permet de mélanger des barres, des courbes et des surfaces.

```tsx
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

<ComposedChart
  data={data}
  responsive
  style={{ width: '100%', height: '100%' }}
>
  <CartesianGrid strokeDasharray="3 3" vertical={false} />
  <XAxis dataKey="mois" />
  <YAxis width="auto" />
  <Tooltip />
  <Legend />
  <Bar dataKey="sorties" name="Sorties" fill="#c7d2fe" />
  <Line dataKey="entrees" name="Entrées" stroke="#059669" strokeWidth={3} />
</ComposedChart>
```

### Autres graphiques disponibles

- `ScatterChart` : relation entre deux valeurs numériques ;
- `RadarChart` : comparaison de plusieurs critères ;
- `RadialBarChart` : barres disposées en cercle ;
- `Treemap` : répartition hiérarchique d’un total ;
- `FunnelChart` : étapes successives d’un parcours ;
- `Sankey` : flux entre plusieurs groupes ;
- `SunburstChart` : données hiérarchiques sous forme circulaire.

Pour une application de budget, commencez généralement avec `LineChart`, `BarChart`, `AreaChart`, `PieChart` ou `ComposedChart`.

## 13. Afficher plusieurs axes

Deux axes sont utiles lorsque les séries ont des échelles très différentes.

```tsx
<YAxis yAxisId="euros" width="auto" />
<YAxis yAxisId="nombre" orientation="right" />

<Bar yAxisId="euros" dataKey="montant" fill="#4f46e5" />
<Line yAxisId="nombre" dataKey="operations" stroke="#0f172a" />
```

Chaque série doit utiliser le même `yAxisId` que l’axe correspondant.

## 14. Ajouter une ligne de référence

`ReferenceLine` matérialise une limite, un objectif ou un budget maximal.

```tsx
import { ReferenceLine } from 'recharts'

<ReferenceLine
  y={1500}
  label="Budget maximum"
  stroke="#dc2626"
  strokeDasharray="5 5"
/>
```

Composants associés :

- `ReferenceLine` : ligne horizontale ou verticale ;
- `ReferenceArea` : zone mise en évidence ;
- `ReferenceDot` : point remarquable.

## 15. Ajouter un dégradé SVG

```tsx
<AreaChart data={data} responsive style={{ width: '100%', height: '100%' }}>
  <defs>
    <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.5} />
      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
    </linearGradient>
  </defs>

  <Area
    dataKey="sorties"
    stroke="#4f46e5"
    fill="url(#expenseGradient)"
  />
</AreaChart>
```

L’identifiant du dégradé doit être unique si plusieurs graphiques sont rendus sur la même page.

## 16. Préparer les transactions reçues de l’API

Recharts ne regroupe pas automatiquement les transactions par date ou catégorie. Cette transformation doit être faite avant le rendu.

Exemple conceptuel pour produire des totaux par catégorie :

```ts
const totalsByCategory = transactions.reduce<Record<string, number>>(
  (accumulator, transaction) => {
    accumulator[transaction.category] =
      (accumulator[transaction.category] ?? 0) + transaction.amount

    return accumulator
  },
  {},
)

const chartData = Object.entries(totalsByCategory).map(([category, amount]) => ({
  category,
  amount,
}))
```

Résultat attendu :

```ts
[
  { category: 'Alimentation', amount: 420 },
  { category: 'Logement', amount: 850 },
]
```

Puis :

```tsx
<XAxis dataKey="category" />
<Bar dataKey="amount" />
```

Dans l’application réelle, placez ce calcul dans un `useMemo` si la liste est longue ou si le composant se rend fréquemment :

```tsx
const chartData = useMemo(() => {
  return transformTransactions(transactions)
}, [transactions])
```

## 17. Gérer l’absence de données

Il est préférable d’afficher un état vide plutôt qu’un graphique sans explication.

```tsx
if (!data.length) {
  return (
    <div className="flex h-80 items-center justify-center text-slate-500">
      Aucune donnée disponible pour cette période.
    </div>
  )
}
```

Vérifiez également que les valeurs numériques ne sont pas `undefined`, `null` ou `NaN`.

## 18. Erreurs fréquentes

### Le graphique ne s’affiche pas

Causes possibles :

- le parent n’a aucune hauteur ;
- `data` est vide ;
- `dataKey` ne correspond à aucune propriété ;
- les valeurs sont des chaînes non numériques ;
- le graphique utilise `width="100%"` sans mécanisme responsive adapté.

Commencez par donner une hauteur explicite au parent :

```tsx
<div className="h-80 w-full">...</div>
```

### Les dates sont dans le mauvais ordre

Triez les données avant le rendu. Utilisez de préférence des dates ISO `YYYY-MM-DD` :

```ts
const sortedData = [...data].sort(
  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
)
```

### Les montants affichent `NaN`

La propriété contient probablement une chaîne vide, une valeur absente ou une chaîne comme `'100 €'`. Convertissez les données en nombres avant de les fournir au graphique.

### La courbe sort de l’axe

Vérifiez `domain`, les valeurs négatives et les marges. Pour inclure automatiquement les extrêmes :

```tsx
<YAxis domain={['auto', 'auto']} />
```

### Les libellés se chevauchent

Vous pouvez incliner ou espacer les libellés :

```tsx
<XAxis
  dataKey="category"
  angle={-35}
  textAnchor="end"
  height={70}
  interval={0}
/>
```

### Le graphique change trop brutalement de taille

Donnez une hauteur stable à sa card et évitez une hauteur calculée à partir d’un contenu qui apparaît après le rendu.

## 19. Accessibilité et lisibilité

- Gardez `accessibilityLayer` actif.
- Ne transmettez pas une information uniquement par la couleur.
- Ajoutez une légende ou des noms explicites.
- Utilisez des contrastes suffisants.
- Limitez le nombre de séries visibles simultanément.
- Formatez clairement les unités et les dates.
- Pour les données essentielles, fournissez également un résumé textuel ou un tableau.

Exemple : vert pour les entrées et rouge pour les sorties, accompagné des libellés `Entrées` et `Sorties`.

## 20. Performances

- Évitez de recréer inutilement un grand tableau de données à chaque rendu.
- Utilisez `useMemo` pour les regroupements coûteux.
- Désactivez éventuellement les animations sur un grand volume :

```tsx
<Line dataKey="solde" isAnimationActive={false} />
```

- Réduisez le nombre de points ou regroupez-les par jour, semaine ou mois.
- Évitez un composant Tooltip personnalisé excessivement complexe.

## 21. Exemple recommandé pour le Dashboard

Pour la card « Fonctionnalité bientôt disponible », un `AreaChart` ou un `ComposedChart` est un bon premier choix :

- axe X : date ou mois ;
- aire bleue-violette : total des dépenses ;
- courbe verte : total des entrées ;
- ligne de référence : montant du budget actif ;
- tooltip : valeurs formatées en euros.

Structure possible des données :

```ts
type DashboardChartData = {
  period: string
  incomes: number
  expenses: number
  balance: number
}
```

Exemple :

```ts
const data: DashboardChartData[] = [
  { period: 'Jan', incomes: 1800, expenses: 950, balance: 850 },
  { period: 'Fév', incomes: 1650, expenses: 1100, balance: 550 },
  { period: 'Mar', incomes: 2100, expenses: 1250, balance: 850 },
]
```

## 22. Méthode conseillée pour construire un graphique

1. Choisir la question à laquelle le graphique doit répondre.
2. Préparer un petit tableau de données statiques.
3. Afficher le composant principal avec une hauteur fixe.
4. Ajouter les axes.
5. Ajouter une seule série.
6. Vérifier les `dataKey`.
7. Ajouter `Tooltip`, la grille et la légende.
8. Brancher les véritables données API.
9. Gérer l’état vide et les erreurs.
10. Personnaliser les couleurs et les formats en dernier.

Cette progression permet de distinguer facilement un problème de données d’un problème d’affichage.

## 23. Aide-mémoire

```tsx
<LineChart
  data={data}
  responsive
  style={{ width: '100%', height: '100%' }}
  margin={{ top: 20, right: 20, bottom: 10, left: 0 }}
>
  <CartesianGrid strokeDasharray="3 3" vertical={false} />
  <XAxis dataKey="label" />
  <YAxis width="auto" tickFormatter={(value) => `${value} €`} />
  <Tooltip formatter={(value) => `${Number(value)} €`} />
  <Legend />
  <Line
    type="monotone"
    dataKey="value"
    name="Valeur"
    stroke="#4f46e5"
    strokeWidth={3}
    dot={false}
  />
</LineChart>
```

Les trois vérifications prioritaires sont toujours :

1. Le parent possède-t-il une hauteur ?
2. `data` contient-il réellement des objets ?
3. Chaque `dataKey` correspond-il exactement à une propriété de ces objets ?
