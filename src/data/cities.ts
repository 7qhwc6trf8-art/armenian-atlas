import type { City } from '../types/domain';

export const cities: City[] = [
  { id: 'tiflis', provinceId: 'gugark', nameHy: 'Տփղիս', nameEn: 'Tiflis', modernName: 'Tbilisi', coordinates: [41.7151, 44.8271], category: 'city', note: 'A major Caucasus city connected to the northern Armenian cultural sphere.' },
  { id: 'lori-berd', provinceId: 'gugark', nameHy: 'Լոռի բերդ', nameEn: 'Lori Fortress', modernName: 'Lori Berd', coordinates: [41.0968, 44.6605], category: 'fortress', note: 'A fortified medieval center overlooking the Dzoraget gorge.' },
  { id: 'akhtala', provinceId: 'gugark', nameHy: 'Ախթալա', nameEn: 'Akhtala', modernName: 'Akhtala', coordinates: [41.1509, 44.7632], category: 'monastery', note: 'Fortress-monastery complex associated with medieval northern Armenia.' },
  { id: 'ardahan', provinceId: 'gugark', nameHy: 'Արտահան', nameEn: 'Artahan', modernName: 'Ardahan', coordinates: [41.1105, 42.7022], category: 'city', note: 'A highland settlement on routes between Kars, Tayk, and the Caucasus.' },

  { id: 'oltu', provinceId: 'tayk', nameHy: 'Օլթի', nameEn: 'Oltu', modernName: 'Oltu', coordinates: [40.5492, 42.0013], category: 'city', note: 'A strategic valley town in the mountainous Tayk landscape.' },
  { id: 'tortum', provinceId: 'tayk', nameHy: 'Թորթում', nameEn: 'Tortum', modernName: 'Tortum', coordinates: [40.2987, 41.6327], category: 'city', note: 'A valley settlement near important medieval monuments.' },
  { id: 'yusufeli', provinceId: 'tayk', nameHy: 'Կիսկիմ', nameEn: 'Kiskim', modernName: 'Yusufeli', coordinates: [40.8204, 41.5374], category: 'city', note: 'A Çoruh valley locality surrounded by Tayk’s monumental heritage.' },
  { id: 'sper', provinceId: 'tayk', nameHy: 'Սպեր', nameEn: 'Sper', modernName: 'İspir', coordinates: [40.4822, 40.9958], category: 'city', note: 'Historic settlement controlling a western approach through the mountains.' },

  { id: 'yerznka', provinceId: 'upper-armenia', nameHy: 'Երզնկա', nameEn: 'Yerznka', modernName: 'Erzincan', coordinates: [39.75, 39.49], category: 'city', note: 'An important upper Euphrates city and regional market.' },
  { id: 'ani-kamakh', provinceId: 'upper-armenia', nameHy: 'Անի-Կամախ', nameEn: 'Ani-Kamakh', modernName: 'Kemah', coordinates: [39.6027, 39.038], category: 'fortress', note: 'A dramatic fortress site above the Euphrates corridor.' },
  { id: 'karin', provinceId: 'upper-armenia', nameHy: 'Կարին', nameEn: 'Karin', modernName: 'Erzurum', coordinates: [39.9043, 41.2679], category: 'city', note: 'A major highland city on trans-Anatolian routes.' },
  { id: 'baberd', provinceId: 'upper-armenia', nameHy: 'Բաբերդ', nameEn: 'Baberd', modernName: 'Bayburt', coordinates: [40.2552, 40.2249], category: 'fortress', note: 'Fortified town on northern roads between the plateau and Black Sea regions.' },

  { id: 'yerevan', provinceId: 'ayrarat', nameHy: 'Երևան', nameEn: 'Yerevan', modernName: 'Yerevan', coordinates: [40.1872, 44.5152], category: 'capital', note: 'The modern capital of Armenia in the Ararat plain.' },
  { id: 'vagharshapat', provinceId: 'ayrarat', nameHy: 'Վաղարշապատ', nameEn: 'Vagharshapat', modernName: 'Etchmiadzin', coordinates: [40.1656, 44.2946], category: 'capital', note: 'A royal and ecclesiastical center central to Armenian Christian heritage.' },
  { id: 'artashat', provinceId: 'ayrarat', nameHy: 'Արտաշատ', nameEn: 'Artashat', modernName: 'Artashat', coordinates: [39.9539, 44.5508], category: 'capital', note: 'Ancient capital founded in the Artaxiad period.' },
  { id: 'dvin', provinceId: 'ayrarat', nameHy: 'Դվին', nameEn: 'Dvin', modernName: 'Dvin archaeological site', coordinates: [40.0048, 44.5785], category: 'site', note: 'A major late antique and medieval metropolis.' },
  { id: 'kars', provinceId: 'ayrarat', nameHy: 'Կարս', nameEn: 'Kars', modernName: 'Kars', coordinates: [40.6013, 43.0975], category: 'city', note: 'A fortified city associated with the Vanand district and Bagratid history.' },

  { id: 'gandzak', provinceId: 'utik', nameHy: 'Գանձակ', nameEn: 'Gandzak', modernName: 'Ganja', coordinates: [40.6828, 46.3606], category: 'city', note: 'A major eastern urban center and crossroads.' },
  { id: 'partav', provinceId: 'utik', nameHy: 'Պարտավ', nameEn: 'Partav', modernName: 'Barda', coordinates: [40.3744, 47.1262], category: 'city', note: 'An important lowland administrative and commercial center.' },
  { id: 'shamkhor', provinceId: 'utik', nameHy: 'Շամքոր', nameEn: 'Shamkhor', modernName: 'Shamkir', coordinates: [40.8297, 46.0178], category: 'city', note: 'Settlement on an important east–west route.' },
  { id: 'tovuz', provinceId: 'utik', nameHy: 'Տավուշ', nameEn: 'Tavush', modernName: 'Tovuz', coordinates: [40.9922, 45.6289], category: 'city', note: 'A foothill locality near routes toward Gugark and the Kura basin.' },

  { id: 'shushi', provinceId: 'artsakh', nameHy: 'Շուշի', nameEn: 'Shushi', modernName: 'Shusha / Shushi', coordinates: [39.7583, 46.7491], category: 'city', note: 'A historic mountain city on a commanding plateau.' },
  { id: 'stepanakert', provinceId: 'artsakh', nameHy: 'Ստեփանակերտ', nameEn: 'Stepanakert', modernName: 'Khankendi / Stepanakert', coordinates: [39.8153, 46.7519], category: 'city', note: 'A modern urban center in the Artsakh highlands.' },
  { id: 'artsakh-tigranakert', provinceId: 'artsakh', nameHy: 'Տիգրանակերտ', nameEn: 'Tigranakert of Artsakh', modernName: 'Archaeological site near Ağdam', coordinates: [40.047, 46.9], category: 'site', note: 'A major archaeological site associated with an ancient Armenian city.' },
  { id: 'amaras', provinceId: 'artsakh', nameHy: 'Ամարաս', nameEn: 'Amaras', modernName: 'Amaras Monastery', coordinates: [39.684, 47.057], category: 'monastery', note: 'An ancient monastic complex in the southeastern highlands.' },

  { id: 'lankaran', provinceId: 'paytakaran', nameHy: 'Լենքորան', nameEn: 'Lenkoran', modernName: 'Lankaran', coordinates: [38.7543, 48.8506], category: 'city', note: 'A Caspian lowland city near the southern coastal corridor.' },
  { id: 'astara', provinceId: 'paytakaran', nameHy: 'Աստարա', nameEn: 'Astara', modernName: 'Astara', coordinates: [38.456, 48.875], category: 'city', note: 'A border and coastal locality at the southern edge of the lowlands.' },
  { id: 'salyan', provinceId: 'paytakaran', nameHy: 'Սալյան', nameEn: 'Salyan', modernName: 'Salyan', coordinates: [39.595, 48.984], category: 'city', note: 'A settlement in the lower Kura–Araxes plain.' },
  { id: 'bilasuvar', provinceId: 'paytakaran', nameHy: 'Բիլասուվար', nameEn: 'Bilasuvar', modernName: 'Bilasuvar', coordinates: [39.4583, 48.545], category: 'city', note: 'A lowland crossroads between river plains and Caspian routes.' },

  { id: 'kapan', provinceId: 'syunik', nameHy: 'Կապան', nameEn: 'Kapan', modernName: 'Kapan', coordinates: [39.2075, 46.4058], category: 'city', note: 'A major center in the southeastern mountain valleys.' },
  { id: 'goris', provinceId: 'syunik', nameHy: 'Գորիս', nameEn: 'Goris', modernName: 'Goris', coordinates: [39.5076, 46.3387], category: 'city', note: 'A historic town framed by distinctive rock formations and cave settlements.' },
  { id: 'sisian', provinceId: 'syunik', nameHy: 'Սիսիան', nameEn: 'Sisian', modernName: 'Sisian', coordinates: [39.521, 46.0285], category: 'city', note: 'A high plateau center near prehistoric and medieval sites.' },
  { id: 'meghri', provinceId: 'syunik', nameHy: 'Մեղրի', nameEn: 'Meghri', modernName: 'Meghri', coordinates: [38.9029, 46.2446], category: 'city', note: 'A warm Araxes valley town on the road toward Iran.' },
  { id: 'tatev', provinceId: 'syunik', nameHy: 'Տաթև', nameEn: 'Tatev', modernName: 'Tatev Monastery', coordinates: [39.379, 46.2504], category: 'monastery', note: 'A major medieval monastery, university, and cultural center above the Vorotan gorge.' },

  { id: 'van', provinceId: 'vaspurakan', nameHy: 'Վան', nameEn: 'Van', modernName: 'Van', coordinates: [38.4942, 43.383], category: 'capital', note: 'The principal urban and royal center of the Lake Van basin.' },
  { id: 'aghtamar', provinceId: 'vaspurakan', nameHy: 'Աղթամար', nameEn: 'Aghtamar', modernName: 'Akdamar Island', coordinates: [38.3417, 43.0366], category: 'monastery', note: 'Island royal and ecclesiastical complex famed for the Church of the Holy Cross.' },
  { id: 'vostan', provinceId: 'vaspurakan', nameHy: 'Ոստան', nameEn: 'Vostan', modernName: 'Gevaş', coordinates: [38.2968, 43.1013], category: 'city', note: 'A southern Lake Van center connected with the Artsruni court.' },
  { id: 'archesh', provinceId: 'vaspurakan', nameHy: 'Արճեշ', nameEn: 'Archesh', modernName: 'Erciş', coordinates: [39.0259, 43.3596], category: 'city', note: 'A historic settlement on the northeastern shore of Lake Van.' },
  { id: 'adamakan', provinceId: 'vaspurakan', nameHy: 'Ադամակերտ', nameEn: 'Adamakan', modernName: 'Başkale', coordinates: [38.0453, 44.0172], category: 'city', note: 'A southeastern highland center on routes toward Iran.' },

  { id: 'mush', provinceId: 'turuberan', nameHy: 'Մուշ', nameEn: 'Mush', modernName: 'Muş', coordinates: [38.9462, 41.7539], category: 'city', note: 'The principal city of the fertile Mush plain.' },
  { id: 'manazkert', provinceId: 'turuberan', nameHy: 'Մանազկերտ', nameEn: 'Manzikert', modernName: 'Malazgirt', coordinates: [39.1468, 42.5354], category: 'fortress', note: 'A fortified town on a key route north of Lake Van.' },
  { id: 'varto', provinceId: 'turuberan', nameHy: 'Վարդո', nameEn: 'Varto', modernName: 'Varto', coordinates: [39.1738, 41.454], category: 'city', note: 'A highland district between the Mush basin and Bingöl ranges.' },
  { id: 'bulanik', provinceId: 'turuberan', nameHy: 'Բուլանըխ', nameEn: 'Bulanikh', modernName: 'Bulanık', coordinates: [39.0925, 42.2703], category: 'city', note: 'A plain and lake district tied to the upper Aratsani system.' },

  { id: 'kharberd', provinceId: 'tsopk', nameHy: 'Խարբերդ', nameEn: 'Kharberd', modernName: 'Elazığ / Harput', coordinates: [38.6743, 39.2225], category: 'fortress', note: 'A fortress-city overlooking the upper Euphrates valleys.' },
  { id: 'palu', provinceId: 'tsopk', nameHy: 'Պալու', nameEn: 'Palu', modernName: 'Palu', coordinates: [38.6912, 39.9283], category: 'city', note: 'A river crossing and fortified settlement on the Aratsani.' },
  { id: 'chemishgezek', provinceId: 'tsopk', nameHy: 'Չմշկածագ', nameEn: 'Chmshkatsag', modernName: 'Çemişgezek', coordinates: [39.0554, 38.9092], category: 'city', note: 'A historic town on western mountain routes.' },
  { id: 'arapgir', provinceId: 'tsopk', nameHy: 'Արաբկիր', nameEn: 'Arabkir', modernName: 'Arapgir', coordinates: [39.0412, 38.494], category: 'city', note: 'A market town linking highland and Euphrates trade corridors.' },

  { id: 'tigranakert', provinceId: 'aghdznik', nameHy: 'Տիգրանակերտ', nameEn: 'Tigranakert', modernName: 'Diyarbakır', coordinates: [37.9144, 40.2306], category: 'capital', note: 'A major fortified metropolis associated with Tigran the Great.' },
  { id: 'batman', provinceId: 'aghdznik', nameHy: 'Բաթման', nameEn: 'Batman', modernName: 'Batman', coordinates: [37.8812, 41.1351], category: 'city', note: 'A modern city in the upper Tigris landscape.' },
  { id: 'martyropolis', provinceId: 'aghdznik', nameHy: 'Մարտիրոպոլիս', nameEn: 'Martyropolis', modernName: 'Silvan', coordinates: [38.1371, 41.0082], category: 'fortress', note: 'An important late antique fortified city.' },
  { id: 'sasun', provinceId: 'aghdznik', nameHy: 'Սասուն', nameEn: 'Sasun', modernName: 'Sason', coordinates: [38.1326, 41.4139], category: 'city', note: 'A mountainous district central to Armenian epic and communal memory.' },

  { id: 'moks-city', provinceId: 'moks', nameHy: 'Մոկս', nameEn: 'Moks', modernName: 'Bahçesaray', coordinates: [38.1236, 42.8026], category: 'city', note: 'The principal valley settlement of Mokk.' },
  { id: 'shatakh', provinceId: 'moks', nameHy: 'Շատախ', nameEn: 'Shatakh', modernName: 'Çatak', coordinates: [38.0068, 43.0612], category: 'city', note: 'A mountain-valley settlement south of Lake Van.' },
  { id: 'hayots-dzor', provinceId: 'moks', nameHy: 'Հայոց ձոր', nameEn: 'Hayots Dzor', modernName: 'Gürpınar', coordinates: [38.3274, 43.413], category: 'site', note: 'A broad valley landscape connecting Van with southern districts.' },
  { id: 'khizan', provinceId: 'moks', nameHy: 'Խիզան', nameEn: 'Khizan', modernName: 'Hizan', coordinates: [38.2258, 42.427], category: 'city', note: 'A secluded mountain district with manuscript and monastic traditions.' },

  { id: 'julamerk', provinceId: 'korchayk', nameHy: 'Ջուլամերկ', nameEn: 'Julamerk', modernName: 'Hakkâri', coordinates: [37.5744, 43.7408], category: 'city', note: 'A major highland center among the southern ranges.' },
  { id: 'shirnak', provinceId: 'korchayk', nameHy: 'Շրնաք', nameEn: 'Shirnak', modernName: 'Şırnak', coordinates: [37.5164, 42.4611], category: 'city', note: 'A southern mountain settlement overlooking Tigris tributaries.' },
  { id: 'chukurca', provinceId: 'korchayk', nameHy: 'Չուխուրճա', nameEn: 'Chukurca', modernName: 'Çukurca', coordinates: [37.2481, 43.6136], category: 'city', note: 'A narrow valley locality near major mountain passes.' },
  { id: 'uludere', provinceId: 'korchayk', nameHy: 'Ուլուդերե', nameEn: 'Uludere', modernName: 'Uludere', coordinates: [37.4451, 42.8522], category: 'city', note: 'A settlement in the rugged southern headwaters region.' },

  { id: 'her', provinceId: 'parskahayk', nameHy: 'Հեր', nameEn: 'Her', modernName: 'Khoy', coordinates: [38.5504, 44.9535], category: 'city', note: 'A historic center on routes between the Armenian plateau and Lake Urmia.' },
  { id: 'salmas', provinceId: 'parskahayk', nameHy: 'Սալմաստ', nameEn: 'Salmas', modernName: 'Salmas', coordinates: [38.1973, 44.7653], category: 'city', note: 'A fertile plain with a long Armenian settlement history.' },
  { id: 'urmia', provinceId: 'parskahayk', nameHy: 'Ուրմիա', nameEn: 'Urmia', modernName: 'Urmia', coordinates: [37.5527, 45.0761], category: 'city', note: 'The principal city of the Lake Urmia basin.' },
  { id: 'maku', provinceId: 'parskahayk', nameHy: 'Մակու', nameEn: 'Maku', modernName: 'Maku', coordinates: [39.2899, 44.4521], category: 'fortress', note: 'A dramatic fortress town on the northwestern Iranian route.' },
];

export const citiesByProvince = cities.reduce<Record<string, City[]>>((groups, city) => {
  (groups[city.provinceId] ??= []).push(city);
  return groups;
}, {});
