// Imports ────────────────────────────────────────────────────────────────────
import { scaleLinear, scaleSqrt, max } from "d3";

// ── Layout ────────────────────────────────────────────────────────────────────
const MARGIN = { top: 30, right: 160, bottom: 75, left: 72 };
const WIDTH = 760;
const HEIGHT = 540;

// ── Continent palette ─────────────────────────────────────────────────────────
const COLOR = {
  Africa: "#F4A261",
  Americas: "#E63946",
  Asia: "#4895EF",
  Europe: "#9B5DE5",
  Oceania: "#06D6A0",
};

// ── Gapminder 2007 dataset ────────────────────────────────────────────────────
const data = [
  // Africa
  {
    country: "Algeria",
    continent: "Africa",
    lifeExp: 72.301,
    pop: 33333216,
    gdpPercap: 6223.37,
  },
  {
    country: "Angola",
    continent: "Africa",
    lifeExp: 42.731,
    pop: 12420476,
    gdpPercap: 4797.23,
  },
  {
    country: "Benin",
    continent: "Africa",
    lifeExp: 56.728,
    pop: 8078314,
    gdpPercap: 1441.28,
  },
  {
    country: "Botswana",
    continent: "Africa",
    lifeExp: 50.728,
    pop: 1639131,
    gdpPercap: 12569.85,
  },
  {
    country: "Burkina Faso",
    continent: "Africa",
    lifeExp: 52.295,
    pop: 14326203,
    gdpPercap: 1217.03,
  },
  {
    country: "Burundi",
    continent: "Africa",
    lifeExp: 49.58,
    pop: 8390505,
    gdpPercap: 430.07,
  },
  {
    country: "Cameroon",
    continent: "Africa",
    lifeExp: 50.43,
    pop: 17696293,
    gdpPercap: 2042.09,
  },
  {
    country: "Central African Republic",
    continent: "Africa",
    lifeExp: 44.741,
    pop: 4369038,
    gdpPercap: 706.02,
  },
  {
    country: "Chad",
    continent: "Africa",
    lifeExp: 50.651,
    pop: 10238807,
    gdpPercap: 1704.06,
  },
  {
    country: "Comoros",
    continent: "Africa",
    lifeExp: 65.152,
    pop: 710960,
    gdpPercap: 986.15,
  },
  {
    country: "Congo Dem. Rep.",
    continent: "Africa",
    lifeExp: 46.462,
    pop: 64606759,
    gdpPercap: 277.55,
  },
  {
    country: "Congo Rep.",
    continent: "Africa",
    lifeExp: 55.322,
    pop: 3800610,
    gdpPercap: 3632.56,
  },
  {
    country: "Cote d'Ivoire",
    continent: "Africa",
    lifeExp: 48.328,
    pop: 18013409,
    gdpPercap: 1544.75,
  },
  {
    country: "Djibouti",
    continent: "Africa",
    lifeExp: 54.791,
    pop: 496374,
    gdpPercap: 2082.48,
  },
  {
    country: "Egypt",
    continent: "Africa",
    lifeExp: 71.338,
    pop: 80264543,
    gdpPercap: 5581.18,
  },
  {
    country: "Equatorial Guinea",
    continent: "Africa",
    lifeExp: 51.579,
    pop: 551201,
    gdpPercap: 12154.09,
  },
  {
    country: "Eritrea",
    continent: "Africa",
    lifeExp: 58.04,
    pop: 4906585,
    gdpPercap: 641.37,
  },
  {
    country: "Ethiopia",
    continent: "Africa",
    lifeExp: 52.947,
    pop: 76511887,
    gdpPercap: 690.81,
  },
  {
    country: "Gabon",
    continent: "Africa",
    lifeExp: 56.735,
    pop: 1454867,
    gdpPercap: 13206.48,
  },
  {
    country: "Gambia",
    continent: "Africa",
    lifeExp: 59.448,
    pop: 1688359,
    gdpPercap: 752.7,
  },
  {
    country: "Ghana",
    continent: "Africa",
    lifeExp: 60.022,
    pop: 22873338,
    gdpPercap: 1327.61,
  },
  {
    country: "Guinea",
    continent: "Africa",
    lifeExp: 56.007,
    pop: 9947814,
    gdpPercap: 942.65,
  },
  {
    country: "Guinea-Bissau",
    continent: "Africa",
    lifeExp: 46.388,
    pop: 1472041,
    gdpPercap: 579.23,
  },
  {
    country: "Kenya",
    continent: "Africa",
    lifeExp: 54.11,
    pop: 35610177,
    gdpPercap: 1463.25,
  },
  {
    country: "Lesotho",
    continent: "Africa",
    lifeExp: 42.592,
    pop: 2012649,
    gdpPercap: 1569.33,
  },
  {
    country: "Liberia",
    continent: "Africa",
    lifeExp: 45.678,
    pop: 3193942,
    gdpPercap: 414.5,
  },
  {
    country: "Libya",
    continent: "Africa",
    lifeExp: 73.952,
    pop: 6036914,
    gdpPercap: 12057.5,
  },
  {
    country: "Madagascar",
    continent: "Africa",
    lifeExp: 59.443,
    pop: 19167654,
    gdpPercap: 1044.77,
  },
  {
    country: "Malawi",
    continent: "Africa",
    lifeExp: 48.303,
    pop: 13327079,
    gdpPercap: 759.35,
  },
  {
    country: "Mali",
    continent: "Africa",
    lifeExp: 54.467,
    pop: 12031795,
    gdpPercap: 1042.58,
  },
  {
    country: "Mauritania",
    continent: "Africa",
    lifeExp: 64.164,
    pop: 3270065,
    gdpPercap: 1803.15,
  },
  {
    country: "Mauritius",
    continent: "Africa",
    lifeExp: 72.801,
    pop: 1250882,
    gdpPercap: 10956.99,
  },
  {
    country: "Morocco",
    continent: "Africa",
    lifeExp: 71.164,
    pop: 33757175,
    gdpPercap: 3820.17,
  },
  {
    country: "Mozambique",
    continent: "Africa",
    lifeExp: 42.082,
    pop: 19951656,
    gdpPercap: 823.69,
  },
  {
    country: "Namibia",
    continent: "Africa",
    lifeExp: 52.906,
    pop: 2055080,
    gdpPercap: 4811.06,
  },
  {
    country: "Niger",
    continent: "Africa",
    lifeExp: 56.867,
    pop: 12894865,
    gdpPercap: 619.69,
  },
  {
    country: "Nigeria",
    continent: "Africa",
    lifeExp: 46.859,
    pop: 135031164,
    gdpPercap: 2013.98,
  },
  {
    country: "Rwanda",
    continent: "Africa",
    lifeExp: 46.242,
    pop: 8860588,
    gdpPercap: 863.09,
  },
  {
    country: "Senegal",
    continent: "Africa",
    lifeExp: 63.062,
    pop: 12267493,
    gdpPercap: 1712.47,
  },
  {
    country: "Sierra Leone",
    continent: "Africa",
    lifeExp: 42.568,
    pop: 6144562,
    gdpPercap: 862.54,
  },
  {
    country: "Somalia",
    continent: "Africa",
    lifeExp: 48.159,
    pop: 9118773,
    gdpPercap: 926.14,
  },
  {
    country: "South Africa",
    continent: "Africa",
    lifeExp: 49.339,
    pop: 43997828,
    gdpPercap: 9269.66,
  },
  {
    country: "Sudan",
    continent: "Africa",
    lifeExp: 58.556,
    pop: 42292929,
    gdpPercap: 2602.39,
  },
  {
    country: "Swaziland",
    continent: "Africa",
    lifeExp: 39.613,
    pop: 1133066,
    gdpPercap: 4513.48,
  },
  {
    country: "Tanzania",
    continent: "Africa",
    lifeExp: 52.517,
    pop: 38139640,
    gdpPercap: 1107.48,
  },
  {
    country: "Togo",
    continent: "Africa",
    lifeExp: 58.42,
    pop: 5701579,
    gdpPercap: 882.97,
  },
  {
    country: "Tunisia",
    continent: "Africa",
    lifeExp: 73.923,
    pop: 10276158,
    gdpPercap: 7092.92,
  },
  {
    country: "Uganda",
    continent: "Africa",
    lifeExp: 51.542,
    pop: 29170398,
    gdpPercap: 1056.38,
  },
  {
    country: "Zambia",
    continent: "Africa",
    lifeExp: 42.384,
    pop: 11746035,
    gdpPercap: 1271.21,
  },
  {
    country: "Zimbabwe",
    continent: "Africa",
    lifeExp: 43.487,
    pop: 12311143,
    gdpPercap: 469.71,
  },
  // Americas
  {
    country: "Argentina",
    continent: "Americas",
    lifeExp: 75.32,
    pop: 40301927,
    gdpPercap: 12779.38,
  },
  {
    country: "Bolivia",
    continent: "Americas",
    lifeExp: 65.554,
    pop: 9119152,
    gdpPercap: 3030.38,
  },
  {
    country: "Brazil",
    continent: "Americas",
    lifeExp: 72.39,
    pop: 190010647,
    gdpPercap: 9065.8,
  },
  {
    country: "Canada",
    continent: "Americas",
    lifeExp: 80.653,
    pop: 33390141,
    gdpPercap: 36319.24,
  },
  {
    country: "Chile",
    continent: "Americas",
    lifeExp: 78.553,
    pop: 16284741,
    gdpPercap: 13171.64,
  },
  {
    country: "Colombia",
    continent: "Americas",
    lifeExp: 72.889,
    pop: 44227550,
    gdpPercap: 7006.58,
  },
  {
    country: "Costa Rica",
    continent: "Americas",
    lifeExp: 78.782,
    pop: 4133884,
    gdpPercap: 9645.06,
  },
  {
    country: "Cuba",
    continent: "Americas",
    lifeExp: 78.273,
    pop: 11416987,
    gdpPercap: 8948.1,
  },
  {
    country: "Dominican Republic",
    continent: "Americas",
    lifeExp: 72.235,
    pop: 9319622,
    gdpPercap: 6025.37,
  },
  {
    country: "Ecuador",
    continent: "Americas",
    lifeExp: 74.994,
    pop: 13755680,
    gdpPercap: 6873.26,
  },
  {
    country: "El Salvador",
    continent: "Americas",
    lifeExp: 71.878,
    pop: 6939688,
    gdpPercap: 5728.35,
  },
  {
    country: "Guatemala",
    continent: "Americas",
    lifeExp: 70.259,
    pop: 12572928,
    gdpPercap: 5186.05,
  },
  {
    country: "Haiti",
    continent: "Americas",
    lifeExp: 60.916,
    pop: 8502814,
    gdpPercap: 1201.64,
  },
  {
    country: "Honduras",
    continent: "Americas",
    lifeExp: 70.198,
    pop: 7483763,
    gdpPercap: 3548.33,
  },
  {
    country: "Jamaica",
    continent: "Americas",
    lifeExp: 72.567,
    pop: 2780132,
    gdpPercap: 7320.88,
  },
  {
    country: "Mexico",
    continent: "Americas",
    lifeExp: 76.195,
    pop: 108700891,
    gdpPercap: 11977.57,
  },
  {
    country: "Nicaragua",
    continent: "Americas",
    lifeExp: 72.899,
    pop: 5675356,
    gdpPercap: 2749.32,
  },
  {
    country: "Panama",
    continent: "Americas",
    lifeExp: 75.537,
    pop: 3242173,
    gdpPercap: 9809.19,
  },
  {
    country: "Paraguay",
    continent: "Americas",
    lifeExp: 71.752,
    pop: 6667147,
    gdpPercap: 4172.84,
  },
  {
    country: "Peru",
    continent: "Americas",
    lifeExp: 71.421,
    pop: 28674757,
    gdpPercap: 7408.91,
  },
  {
    country: "Puerto Rico",
    continent: "Americas",
    lifeExp: 78.746,
    pop: 3942491,
    gdpPercap: 19328.71,
  },
  {
    country: "Trinidad and Tobago",
    continent: "Americas",
    lifeExp: 69.819,
    pop: 1056608,
    gdpPercap: 18008.51,
  },
  {
    country: "United States",
    continent: "Americas",
    lifeExp: 78.242,
    pop: 301139947,
    gdpPercap: 42951.65,
  },
  {
    country: "Uruguay",
    continent: "Americas",
    lifeExp: 76.384,
    pop: 3447496,
    gdpPercap: 10611.46,
  },
  {
    country: "Venezuela",
    continent: "Americas",
    lifeExp: 73.747,
    pop: 26084662,
    gdpPercap: 11415.81,
  },
  // Asia
  {
    country: "Afghanistan",
    continent: "Asia",
    lifeExp: 43.828,
    pop: 31889923,
    gdpPercap: 974.58,
  },
  {
    country: "Bahrain",
    continent: "Asia",
    lifeExp: 75.635,
    pop: 708573,
    gdpPercap: 29796.05,
  },
  {
    country: "Bangladesh",
    continent: "Asia",
    lifeExp: 64.062,
    pop: 150448339,
    gdpPercap: 1391.25,
  },
  {
    country: "Cambodia",
    continent: "Asia",
    lifeExp: 59.723,
    pop: 14131858,
    gdpPercap: 1713.78,
  },
  {
    country: "China",
    continent: "Asia",
    lifeExp: 72.961,
    pop: 1318683096,
    gdpPercap: 4959.11,
  },
  {
    country: "Hong Kong",
    continent: "Asia",
    lifeExp: 82.208,
    pop: 6980412,
    gdpPercap: 39724.98,
  },
  {
    country: "India",
    continent: "Asia",
    lifeExp: 64.698,
    pop: 1110396331,
    gdpPercap: 2452.21,
  },
  {
    country: "Indonesia",
    continent: "Asia",
    lifeExp: 70.65,
    pop: 223547000,
    gdpPercap: 3540.65,
  },
  {
    country: "Iran",
    continent: "Asia",
    lifeExp: 70.964,
    pop: 69453570,
    gdpPercap: 11605.71,
  },
  {
    country: "Iraq",
    continent: "Asia",
    lifeExp: 59.545,
    pop: 27499638,
    gdpPercap: 4471.06,
  },
  {
    country: "Israel",
    continent: "Asia",
    lifeExp: 80.745,
    pop: 6426679,
    gdpPercap: 25523.28,
  },
  {
    country: "Japan",
    continent: "Asia",
    lifeExp: 82.603,
    pop: 127467972,
    gdpPercap: 31656.07,
  },
  {
    country: "Jordan",
    continent: "Asia",
    lifeExp: 72.535,
    pop: 6053193,
    gdpPercap: 4519.46,
  },
  {
    country: "Korea Dem. Rep.",
    continent: "Asia",
    lifeExp: 67.297,
    pop: 23301725,
    gdpPercap: 1593.06,
  },
  {
    country: "Korea Rep.",
    continent: "Asia",
    lifeExp: 78.623,
    pop: 49044790,
    gdpPercap: 23348.14,
  },
  {
    country: "Kuwait",
    continent: "Asia",
    lifeExp: 77.588,
    pop: 2505559,
    gdpPercap: 47306.99,
  },
  {
    country: "Lebanon",
    continent: "Asia",
    lifeExp: 71.993,
    pop: 3921278,
    gdpPercap: 10461.06,
  },
  {
    country: "Malaysia",
    continent: "Asia",
    lifeExp: 74.241,
    pop: 24821286,
    gdpPercap: 12451.65,
  },
  {
    country: "Mongolia",
    continent: "Asia",
    lifeExp: 66.803,
    pop: 2874127,
    gdpPercap: 3095.77,
  },
  {
    country: "Myanmar",
    continent: "Asia",
    lifeExp: 62.069,
    pop: 47761980,
    gdpPercap: 944.0,
  },
  {
    country: "Nepal",
    continent: "Asia",
    lifeExp: 63.785,
    pop: 28901790,
    gdpPercap: 1091.36,
  },
  {
    country: "Oman",
    continent: "Asia",
    lifeExp: 75.64,
    pop: 3204897,
    gdpPercap: 22316.19,
  },
  {
    country: "Pakistan",
    continent: "Asia",
    lifeExp: 65.483,
    pop: 169270617,
    gdpPercap: 2605.95,
  },
  {
    country: "Philippines",
    continent: "Asia",
    lifeExp: 71.688,
    pop: 91077287,
    gdpPercap: 3190.48,
  },
  {
    country: "Saudi Arabia",
    continent: "Asia",
    lifeExp: 72.777,
    pop: 27601038,
    gdpPercap: 21654.83,
  },
  {
    country: "Singapore",
    continent: "Asia",
    lifeExp: 79.972,
    pop: 4553009,
    gdpPercap: 47143.18,
  },
  {
    country: "Sri Lanka",
    continent: "Asia",
    lifeExp: 72.396,
    pop: 20378239,
    gdpPercap: 3970.1,
  },
  {
    country: "Syria",
    continent: "Asia",
    lifeExp: 74.143,
    pop: 19314747,
    gdpPercap: 4184.55,
  },
  {
    country: "Thailand",
    continent: "Asia",
    lifeExp: 70.616,
    pop: 65068149,
    gdpPercap: 7458.4,
  },
  {
    country: "Vietnam",
    continent: "Asia",
    lifeExp: 74.249,
    pop: 85262356,
    gdpPercap: 2441.58,
  },
  {
    country: "West Bank and Gaza",
    continent: "Asia",
    lifeExp: 73.422,
    pop: 4018332,
    gdpPercap: 3025.35,
  },
  {
    country: "Yemen",
    continent: "Asia",
    lifeExp: 62.698,
    pop: 22211743,
    gdpPercap: 2280.77,
  },
  // Europe
  {
    country: "Albania",
    continent: "Europe",
    lifeExp: 76.423,
    pop: 3600523,
    gdpPercap: 5937.03,
  },
  {
    country: "Austria",
    continent: "Europe",
    lifeExp: 79.829,
    pop: 8199783,
    gdpPercap: 36126.49,
  },
  {
    country: "Belgium",
    continent: "Europe",
    lifeExp: 79.441,
    pop: 10392226,
    gdpPercap: 33692.61,
  },
  {
    country: "Bosnia and Herzegovina",
    continent: "Europe",
    lifeExp: 74.852,
    pop: 4552198,
    gdpPercap: 7446.3,
  },
  {
    country: "Bulgaria",
    continent: "Europe",
    lifeExp: 73.005,
    pop: 7322858,
    gdpPercap: 10680.79,
  },
  {
    country: "Croatia",
    continent: "Europe",
    lifeExp: 75.748,
    pop: 4493312,
    gdpPercap: 14619.22,
  },
  {
    country: "Czech Republic",
    continent: "Europe",
    lifeExp: 76.486,
    pop: 10228744,
    gdpPercap: 22833.31,
  },
  {
    country: "Denmark",
    continent: "Europe",
    lifeExp: 78.332,
    pop: 5468120,
    gdpPercap: 35278.42,
  },
  {
    country: "Finland",
    continent: "Europe",
    lifeExp: 79.313,
    pop: 5238460,
    gdpPercap: 33207.08,
  },
  {
    country: "France",
    continent: "Europe",
    lifeExp: 80.657,
    pop: 61083916,
    gdpPercap: 30470.02,
  },
  {
    country: "Germany",
    continent: "Europe",
    lifeExp: 79.406,
    pop: 82400996,
    gdpPercap: 32170.37,
  },
  {
    country: "Greece",
    continent: "Europe",
    lifeExp: 79.483,
    pop: 10706290,
    gdpPercap: 27538.41,
  },
  {
    country: "Hungary",
    continent: "Europe",
    lifeExp: 73.338,
    pop: 9956108,
    gdpPercap: 18008.94,
  },
  {
    country: "Iceland",
    continent: "Europe",
    lifeExp: 81.757,
    pop: 301931,
    gdpPercap: 36180.79,
  },
  {
    country: "Ireland",
    continent: "Europe",
    lifeExp: 78.885,
    pop: 4109086,
    gdpPercap: 40675.99,
  },
  {
    country: "Italy",
    continent: "Europe",
    lifeExp: 80.546,
    pop: 58147733,
    gdpPercap: 28569.72,
  },
  {
    country: "Montenegro",
    continent: "Europe",
    lifeExp: 74.543,
    pop: 684736,
    gdpPercap: 9253.9,
  },
  {
    country: "Netherlands",
    continent: "Europe",
    lifeExp: 79.762,
    pop: 16570613,
    gdpPercap: 36797.93,
  },
  {
    country: "Norway",
    continent: "Europe",
    lifeExp: 80.196,
    pop: 4627926,
    gdpPercap: 49357.19,
  },
  {
    country: "Poland",
    continent: "Europe",
    lifeExp: 75.563,
    pop: 38518241,
    gdpPercap: 15389.92,
  },
  {
    country: "Portugal",
    continent: "Europe",
    lifeExp: 78.098,
    pop: 10642836,
    gdpPercap: 20509.65,
  },
  {
    country: "Romania",
    continent: "Europe",
    lifeExp: 72.476,
    pop: 22276056,
    gdpPercap: 10808.48,
  },
  {
    country: "Serbia",
    continent: "Europe",
    lifeExp: 74.002,
    pop: 10150265,
    gdpPercap: 9786.53,
  },
  {
    country: "Slovak Republic",
    continent: "Europe",
    lifeExp: 74.663,
    pop: 5447502,
    gdpPercap: 18678.31,
  },
  {
    country: "Slovenia",
    continent: "Europe",
    lifeExp: 77.926,
    pop: 2009245,
    gdpPercap: 25768.26,
  },
  {
    country: "Spain",
    continent: "Europe",
    lifeExp: 80.941,
    pop: 40448191,
    gdpPercap: 28821.06,
  },
  {
    country: "Sweden",
    continent: "Europe",
    lifeExp: 80.884,
    pop: 9031088,
    gdpPercap: 33859.75,
  },
  {
    country: "Switzerland",
    continent: "Europe",
    lifeExp: 81.701,
    pop: 7554661,
    gdpPercap: 37506.42,
  },
  {
    country: "Turkey",
    continent: "Europe",
    lifeExp: 71.777,
    pop: 71158647,
    gdpPercap: 8458.28,
  },
  {
    country: "United Kingdom",
    continent: "Europe",
    lifeExp: 79.425,
    pop: 60776238,
    gdpPercap: 33203.26,
  },
  // Oceania
  {
    country: "Australia",
    continent: "Oceania",
    lifeExp: 81.235,
    pop: 20434176,
    gdpPercap: 34435.37,
  },
  {
    country: "New Zealand",
    continent: "Oceania",
    lifeExp: 80.204,
    pop: 4115771,
    gdpPercap: 25185.01,
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmtGDP = (v) =>
  v === 0 ? "0" : v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v);

// ── Component ─────────────────────────────────────────────────────────────────
export default function App() {
  const boundsWidth = WIDTH - MARGIN.left - MARGIN.right;
  const boundsHeight = HEIGHT - MARGIN.top - MARGIN.bottom;

  const xScale = scaleLinear().domain([0, 52000]).range([0, boundsWidth]);

  const yScale = scaleLinear().domain([35, 85]).range([boundsHeight, 0]);

  const sizeScale = scaleSqrt()
    .domain([0, max(data, (d) => d.pop)])
    .range([2, 44]);

  // Render big bubbles first so small ones sit on top
  const sorted = [...data].sort((a, b) => b.pop - a.pop);

  // Pre-compute nested-circle population legend
  const popLegendPops = [1e9, 200e6, 50e6];
  const popLegendRadii = popLegendPops.map((p) => sizeScale(p));
  const popLegendRMax = popLegendRadii[0];
  const popLegendBottom = popLegendRMax * 2;
  const popLegendCx = popLegendRMax;
  const popLegendLineX = popLegendCx + popLegendRMax + 8;
  const popLegendLabelX = popLegendLineX + 5;
  const popLegendLabel = (p) =>
    p >= 1e9 ? `${(p / 1e9).toFixed(1)}B` : `${Math.round(p / 1e6)}M`;

  const xTicks = [0, 10000, 20000, 30000, 40000, 50000];
  const yTicks = [40, 45, 50, 55, 60, 65, 70, 75, 80, 85];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e0f2fe 0%, #f0e6ff 100%)",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        padding: "24px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "28px 32px 20px",
          boxShadow: "0 12px 48px rgba(0,0,0,0.12)",
        }}
      >
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <h2
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: 700,
              color: "#1e1e2e",
              letterSpacing: "-0.3px",
            }}
          >
            Wealth &amp; Health Across the Globe
          </h2>
          <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#888" }}>
            GDP per Capita vs Life Expectancy · bubble area = population ·
            Gapminder 2007
          </p>
        </div>

        <svg width={WIDTH} height={HEIGHT}>
          <defs>
            {/* Soft vignette around plot area */}
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="1"
                stdDeviation="2"
                floodOpacity="0.12"
              />
            </filter>
          </defs>

          <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
            {/* ── Grid lines ──────────────────────────────────────────── */}
            {yTicks.map((v) => (
              <line
                key={v}
                x1={0}
                x2={boundsWidth}
                y1={yScale(v)}
                y2={yScale(v)}
                stroke="#ebebf0"
                strokeWidth={1}
                strokeDasharray="4 4"
              />
            ))}
            {xTicks.map((v) => (
              <line
                key={v}
                x1={xScale(v)}
                x2={xScale(v)}
                y1={0}
                y2={boundsHeight}
                stroke="#ebebf0"
                strokeWidth={1}
                strokeDasharray="4 4"
              />
            ))}

            {/* ── Bubbles ─────────────────────────────────────────────── */}
            {sorted.map((d) => (
              <circle
                key={d.country}
                cx={xScale(d.gdpPercap)}
                cy={yScale(d.lifeExp)}
                r={sizeScale(d.pop)}
                fill={COLOR[d.continent]}
                fillOpacity={0.62}
                stroke="white"
                strokeWidth={1.4}
                filter="url(#shadow)"
              />
            ))}

            {/* ── X axis ──────────────────────────────────────────────── */}
            <line
              x1={0}
              x2={boundsWidth}
              y1={boundsHeight}
              y2={boundsHeight}
              stroke="#d0d0d8"
              strokeWidth={1.2}
            />
            {xTicks.map((v) => (
              <g key={v} transform={`translate(${xScale(v)}, ${boundsHeight})`}>
                <line y1={0} y2={6} stroke="#d0d0d8" />
                <text y={20} textAnchor="middle" fontSize={11} fill="#777">
                  {fmtGDP(v)}
                </text>
              </g>
            ))}
            {/* X axis label */}
            <text
              x={boundsWidth / 2}
              y={boundsHeight + 50}
              textAnchor="middle"
              fontSize={13}
              fontWeight={600}
              fill="#444"
            >
              GDP per Capita (USD)
            </text>

            {/* ── Y axis ──────────────────────────────────────────────── */}
            <line
              x1={0}
              x2={0}
              y1={0}
              y2={boundsHeight}
              stroke="#d0d0d8"
              strokeWidth={1.2}
            />
            {yTicks.map((v) => (
              <g key={v} transform={`translate(0, ${yScale(v)})`}>
                <line x1={0} x2={-6} stroke="#d0d0d8" />
                <text
                  x={-10}
                  dominantBaseline="middle"
                  textAnchor="end"
                  fontSize={11}
                  fill="#777"
                >
                  {v}
                </text>
              </g>
            ))}
            {/* Y axis label */}
            <text
              transform={`translate(${-56}, ${boundsHeight / 2}) rotate(-90)`}
              textAnchor="middle"
              fontSize={13}
              fontWeight={600}
              fill="#444"
            >
              Life Expectancy (years)
            </text>

            {/* ── Legend ──────────────────────────────────────────────── */}
            <g transform={`translate(${boundsWidth + 18}, 10)`}>
              {Object.entries(COLOR).map(([continent, color], i) => (
                <g key={continent} transform={`translate(0, ${i * 28})`}>
                  <circle
                    r={9}
                    cx={9}
                    cy={0}
                    fill={color}
                    fillOpacity={0.72}
                    stroke="white"
                    strokeWidth={1.5}
                  />
                  <text
                    x={23}
                    dominantBaseline="middle"
                    fontSize={12}
                    fill="#444"
                  >
                    {continent}
                  </text>
                </g>
              ))}

              {/* Population size guide — nested circles */}
              <g
                transform={`translate(0, ${Object.keys(COLOR).length * 28 + 24})`}
              >
                <text fontSize={10} fill="#aaa" fontStyle="italic" y={-6}>
                  population
                </text>
                {/* Circles, all bottom-aligned */}
                {popLegendPops.map((pop, i) => {
                  const r = popLegendRadii[i];
                  return (
                    <circle
                      key={pop}
                      cx={popLegendCx}
                      cy={popLegendBottom - r}
                      r={r}
                      fill="none"
                      stroke="#c0c0c8"
                      strokeWidth={1}
                    />
                  );
                })}
                {/* Horizontal tick lines + labels at top of each circle */}
                {popLegendPops.map((pop, i) => {
                  const r = popLegendRadii[i];
                  const topY = popLegendBottom - 2 * r;
                  return (
                    <g key={pop}>
                      <line
                        x1={popLegendLineX}
                        x2={popLegendLabelX}
                        y1={topY}
                        y2={topY}
                        stroke="#c8c8d0"
                        strokeWidth={0.8}
                      />
                      <text
                        x={popLegendLabelX + 3}
                        y={topY}
                        dominantBaseline="middle"
                        fontSize={9.5}
                        fill="#888"
                      >
                        {popLegendLabel(pop)}
                      </text>
                    </g>
                  );
                })}
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
