import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { City, Division, Province, ProvinceId } from '../types/domain';

export type AtlasLanguage = 'am' | 'en' | 'ru' | 'tr' | 'az';

export const languageOptions: Array<{ id: AtlasLanguage; nativeLabel: string; shortLabel: string }> = [
  { id: 'am', nativeLabel: 'Հայերեն', shortLabel: 'AM' },
  { id: 'en', nativeLabel: 'English', shortLabel: 'EN' },
  { id: 'ru', nativeLabel: 'Русский', shortLabel: 'RU' },
  { id: 'tr', nativeLabel: 'Türkçe', shortLabel: 'TR' },
  { id: 'az', nativeLabel: 'Azərbaycanca', shortLabel: 'AZ' },
];

export const localeByLanguage: Record<AtlasLanguage, string> = {
  am: 'hy-AM',
  en: 'en-US',
  ru: 'ru-RU',
  tr: 'tr-TR',
  az: 'az-AZ',
};

type Dictionary = Record<string, string>;

const am: Dictionary = {
  'brand.title': 'Հայկական Ատլաս',
  'brand.tagline': 'ՊԱՏՄԱՔԱՐՏԵԶ · ԺԱՌԱՆԳՈՒԹՅՈՒՆ · ՎԱՅՐԵՐ',
  'nav.map': 'Քարտեզ', 'nav.browse': 'Որոնում', 'nav.saved': 'Պահված', 'nav.profile': 'Պրոֆիլ',
  'aria.mainNav': 'Գլխավոր նավարկում', 'aria.goMap': 'Բացել քարտեզը', 'aria.search': 'Որոնել ատլասում',
  'aria.openSaved': 'Բացել պահված վայրերը', 'aria.closeSearch': 'Փակել որոնումը', 'aria.toggleSaved': 'Փոխել պահման վիճակը',
  'aria.saveProvince': 'Պահել նահանգը', 'aria.toggleDetails': 'Բացել կամ փակել տարածքի մանրամասները',
  'aria.mapMode': 'Քարտեզի ցուցադրման ռեժիմ', 'aria.divisionFilter': 'Արևմտյան և Արևելյան Հայաստանի զտիչ',
  'aria.eraFilter': 'Ներկա և պատմական վայրերի զտիչ', 'aria.resetMap': 'Վերականգնել քարտեզի տեսքը',
  'aria.zoomControls': 'Քարտեզի խոշորացման կառավարում', 'aria.zoomIn': 'Մեծացնել', 'aria.zoomOut': 'Փոքրացնել',
  'browse.eyebrow': 'ԲԱՑԱՀԱՅՏԵԼ', 'browse.title': 'Քարտեզի շտեմարան',
  'browse.subtitle': '15 նահանգ · ներկա և պատմական բոլոր քաղաքային վայրերը',
  'browse.placeholder': 'Անի, Այրարատ, Վան, Շուշի…', 'browse.provinces': 'Նահանգներ',
  'map.provinces': '15 նահանգ', 'map.divisions': 'Արևմտյան / Արևելյան', 'map.loadingPlaces': 'Վայրերը բեռնվում են…',
  'map.places': '{count} վայր', 'map.all': 'Բոլորը', 'map.western': 'Արևմտյան', 'map.eastern': 'Արևելյան',
  'map.present': 'Ներկա', 'map.historical': 'Անցյալ', 'map.refreshing': 'Թարմացվում է…',
  'map.offline': 'Օֆլայն բազա', 'map.live': 'OSM ուղիղ', 'map.database': 'OpenStreetMap բնակավայրերի շտեմարան',
  'map.legend': 'Քարտեզի բաժանման բացատրություն', 'map.provinceCount': '{count} նահանգ', 'map.residents': '{count} բնակիչ',
  'map.loadError': 'Քարտեզի տվյալները հնարավոր չէ բեռնել',
  'division.western': 'Արևմտյան Հայաստան', 'division.eastern': 'Արևելյան Հայաստան',
  'era.present': 'Ներկա', 'era.historical': 'Պատմական', 'era.both': 'Ներկա և պատմական',
  'saved.eyebrow': 'ԻՄ ՀԱՎԱՔԱԾՈՒՆ', 'saved.title': 'Պահված վայրեր', 'saved.subtitle': 'Պահեք նահանգները՝ արագ վերադառնալու համար',
  'saved.emptyTitle': 'Դեռ պահված նահանգ չկա', 'saved.emptyText': 'Քարտեզում սեղմեք նշման կոճակը և կազմեք ձեր անձնական պատմական ուղեցույցը։',
  'saved.openMap': 'Բացել քարտեզը', 'saved.recommended': 'Առաջարկվող վայրեր',
  'profile.visitor': 'Հայկական ժառանգության այցելու', 'profile.initials': 'ՀԱ', 'profile.eyebrow': 'ԻՄ ԱՏԼԱՍԸ',
  'profile.guide': 'Անձնական պատմական ուղեցույց', 'profile.progress': 'Բացահայտման առաջընթաց',
  'profile.completed': '{count}% ավարտված', 'profile.viewedProgress': '{visited} / {total} նահանգ դիտված է',
  'profile.viewed': 'Դիտված', 'profile.saved': 'Պահված', 'profile.province': 'Նահանգ',
  'profile.savedPlaces': 'Պահված վայրեր', 'profile.savedDescription': 'Ձեր ընտրված նահանգներն ու ուղեցույցները',
  'profile.settings': 'Կարգավորումներ', 'profile.settingsDescription': 'Տեսք, լեզու, քարտեզ, արձագանք և տվյալներ',
  'profile.share': 'Կիսվել ատլասով', 'profile.shareDescription': 'Ուղարկել ընկերներին կամ պատճենել հղումը',
  'profile.recent': 'Վերջերս դիտված', 'profile.startHere': 'Սկսեք այստեղից',
  'profile.shareTitle': 'Հայկական Ատլաս', 'profile.shareText': 'Բացահայտեք Մեծ Հայքի 15 նահանգները, քաղաքները և պատմական վայրերը։',
  'search.eyebrow': 'ԱՏԼԱՍԻ ՈՐՈՆՈՒՄ', 'search.title': 'Գտնել ներկա կամ պատմական վայր',
  'search.placeholder': 'Անի, Վան, Karin, Erzurum, Շուշի…', 'search.loading': 'Բեռնվում է ամբողջ քաղաքային բազան…',
  'search.databaseStatus': '{count} վայր · հայկական, ներկա և հին անուններով', 'search.provinces': 'Նահանգներ',
  'search.places': 'Քաղաքներ, բնակավայրեր և պատմական վայրեր',
  'search.empty': 'Ոչինչ չգտնվեց։ Փորձեք հայկական, ժամանակակից կամ նախկին անունը։',
  'card.area': 'Մակերես', 'card.perimeter': 'Պարագիծ', 'card.openOnMap': 'Բացել քարտեզում',
  'territory.previousNames': 'Անցյալ անուններ՝', 'territory.closeDetails': 'Փակել մանրամասները',
  'territory.openAll': 'Բացել բոլոր {count} վայրերը', 'territory.allPlaces': 'Բոլոր քաղաքներն ու վայրերը',
  'territory.presentCount': 'Ներկա՝', 'territory.historicalCount': 'Անցյալ՝',
  'territory.searchPlaceholder': 'Որոնել հայկական, ներկա կամ հին անունով…', 'territory.noPlace': 'Այս անունով վայր չի գտնվել։',
  'territory.dossier': 'Տարածքի տեղեկագիր', 'territory.area': 'ՄԱԿԵՐԵՍ', 'territory.perimeter': 'ՊԱՐԱԳԻԾ',
  'territory.eastWest': 'ԱՐԵՎՄՈՒՏՔ–ԱՐԵՎԵԼՔ', 'territory.northSouth': 'ՀՅՈՒՍԻՍ–ՀԱՐԱՎ',
  'territory.share': '15 նահանգների քարտեզագրված ընդհանուր տարածքից', 'territory.centers': 'ԿԵՆՏՐՈՆՆԵՐ',
  'territory.cantons': 'ԳԱՎԱՌՆԵՐ', 'territory.geography': 'ԱՇԽԱՐՀԱԳՐՈՒԹՅՈՒՆ', 'territory.presentAreas': 'ՆԵՐԿԱ ՏԱՐԱԾՔՆԵՐ',
  'territory.measurementNote': 'Չափումները հաշվարկված են GeoJSON սահմանագծերից՝ WGS84 գեոդեզիական մեթոդով և կլորացված են։ Պատմական սահմանները մեկնաբանական են, ուստի թվերը մոտավոր քարտեզագրական գնահատականներ են։',
  'territory.heritage': 'Ժառանգության առանցքներ', 'territory.timeline': 'Ժամանակագրություն',
  'settings.eyebrow': 'ԱՆՁՆԱԿԱՆԱՑՈՒՄ', 'settings.title': 'Կարգավորումներ', 'settings.appearance': 'Արտաքին տեսք',
  'settings.appearanceDescription': 'Ընտրեք ատլասի գունային միջավայրը', 'settings.system': 'Համակարգ', 'settings.light': 'Լուսավոր', 'settings.dark': 'Մուգ',
  'settings.language': 'Լեզու', 'settings.languageDescription': 'Ընտրեք հավելվածի հիմնական լեզուն',
  'settings.mapDisplay': 'Քարտեզի ցուցադրում', 'settings.mapDisplayDescription': 'Կառավարեք անուններն ու շերտերի մանրամասները',
  'settings.mapLabels': 'Քարտեզի պիտակներ', 'settings.mapLabelsDescription': 'Ցուցադրել նահանգների և բաժանումների անունները քարտեզի վրա',
  'settings.modernNames': 'Ժամանակակից անուններ', 'settings.modernNamesDescription': 'Հայկական անվան կողքին ցուցադրել ներկայիս միջազգային անունը',
  'settings.interaction': 'Փոխազդեցություն', 'settings.interactionDescription': 'Հարմարեցրեք շարժումն ու Telegram արձագանքը',
  'settings.haptics': 'Հապտիկ արձագանք', 'settings.hapticsDescription': 'Թեթև թրթռում նավիգացիայի և պահման ժամանակ',
  'settings.reduceMotion': 'Նվազեցնել անիմացիաները', 'settings.reduceMotionDescription': 'Ավելի հանգիստ անցումներ և նվազ շարժում',
  'settings.data': 'Տվյալներ և պահոց', 'settings.dataDescription': 'Կառավարեք տեղային քարտեզային տվյալները',
  'settings.clearCache': 'Մաքրել քաղաքների պահոցը', 'settings.clearCacheDescription': 'Հաջորդ բացման ժամանակ տվյալները նորից կներբեռնվեն',
  'settings.resetAtlas': 'Վերակայել անձնական ատլասը', 'settings.resetAtlasDescription': 'Հեռացնել պահված և դիտված նահանգները',
  'settings.cacheCleared': 'Քաղաքների օֆլայն պահոցը մաքրված է։', 'settings.atlasReset': 'Ատլասի տեղային վիճակը վերակայված է։',
  'settings.about': 'Հայկական Ատլաս', 'settings.version': 'Տարբերակ 2.1.0 · նորացված բազմալեզու UI',
  'settings.disclaimer': 'Պատմական սահմաններն ու չափումները քարտեզագրական գնահատականներ են և կարող են ընդլայնվել մասնագիտական աղբյուրներով։',
};

const en: Dictionary = {
  'brand.title': 'Armenian Atlas', 'brand.tagline': 'HISTORICAL MAP · HERITAGE · PLACES',
  'nav.map': 'Map', 'nav.browse': 'Browse', 'nav.saved': 'Saved', 'nav.profile': 'Profile',
  'aria.mainNav': 'Main navigation', 'aria.goMap': 'Go to map', 'aria.search': 'Search atlas', 'aria.openSaved': 'Open saved places',
  'aria.closeSearch': 'Close search', 'aria.toggleSaved': 'Toggle saved', 'aria.saveProvince': 'Save province',
  'aria.toggleDetails': 'Toggle territory details', 'aria.mapMode': 'Map display mode', 'aria.divisionFilter': 'Western and Eastern Armenia filter',
  'aria.eraFilter': 'Present and historical place filter', 'aria.resetMap': 'Reset map view', 'aria.zoomControls': 'Map zoom controls',
  'aria.zoomIn': 'Zoom in', 'aria.zoomOut': 'Zoom out',
  'browse.eyebrow': 'DISCOVER', 'browse.title': 'Atlas directory', 'browse.subtitle': '15 provinces · all present-day and historical urban places',
  'browse.placeholder': 'Ani, Ayrarat, Van, Shushi…', 'browse.provinces': 'Provinces',
  'map.provinces': '15 provinces', 'map.divisions': 'Western / Eastern', 'map.loadingPlaces': 'Loading places…', 'map.places': '{count} places',
  'map.all': 'All', 'map.western': 'Western', 'map.eastern': 'Eastern', 'map.present': 'Present', 'map.historical': 'Historical',
  'map.refreshing': 'Refreshing…', 'map.offline': 'Offline database', 'map.live': 'OSM live', 'map.database': 'OpenStreetMap settlement database',
  'map.legend': 'Map division legend', 'map.provinceCount': '{count} provinces', 'map.residents': '{count} residents', 'map.loadError': 'Unable to load map data',
  'division.western': 'Western Armenia', 'division.eastern': 'Eastern Armenia',
  'era.present': 'Present-day', 'era.historical': 'Historical', 'era.both': 'Present-day and historical',
  'saved.eyebrow': 'MY COLLECTION', 'saved.title': 'Saved places', 'saved.subtitle': 'Save provinces for quick access',
  'saved.emptyTitle': 'No saved province yet', 'saved.emptyText': 'Tap the bookmark button on the map to build your personal historical guide.',
  'saved.openMap': 'Open map', 'saved.recommended': 'Recommended places',
  'profile.visitor': 'Armenian heritage visitor', 'profile.initials': 'AA', 'profile.eyebrow': 'MY ATLAS', 'profile.guide': 'Personal historical guide',
  'profile.progress': 'Discovery progress', 'profile.completed': '{count}% completed', 'profile.viewedProgress': '{visited} / {total} provinces viewed',
  'profile.viewed': 'Viewed', 'profile.saved': 'Saved', 'profile.province': 'Provinces',
  'profile.savedPlaces': 'Saved places', 'profile.savedDescription': 'Your selected provinces and guides',
  'profile.settings': 'Settings', 'profile.settingsDescription': 'Appearance, language, map, feedback and data',
  'profile.share': 'Share atlas', 'profile.shareDescription': 'Send to friends or copy the link',
  'profile.recent': 'Recently viewed', 'profile.startHere': 'Start here',
  'profile.shareTitle': 'Armenian Atlas', 'profile.shareText': 'Discover the 15 provinces, cities and historical places of Greater Armenia.',
  'search.eyebrow': 'ATLAS SEARCH', 'search.title': 'Find a present-day or historical place', 'search.placeholder': 'Ani, Van, Karin, Erzurum, Shushi…',
  'search.loading': 'Loading the complete settlement catalog…', 'search.databaseStatus': '{count} places · Armenian, modern and former names',
  'search.provinces': 'Provinces', 'search.places': 'Cities, settlements and historical places',
  'search.empty': 'Nothing found. Try an Armenian, modern or former name.',
  'card.area': 'Area', 'card.perimeter': 'Perimeter', 'card.openOnMap': 'Open on map',
  'territory.previousNames': 'Former names:', 'territory.closeDetails': 'Close details', 'territory.openAll': 'Open all {count} places',
  'territory.allPlaces': 'All cities and places', 'territory.presentCount': 'Present:', 'territory.historicalCount': 'Historical:',
  'territory.searchPlaceholder': 'Search by Armenian, modern or former name…', 'territory.noPlace': 'No place found with this name.',
  'territory.dossier': 'Territory dossier', 'territory.area': 'AREA', 'territory.perimeter': 'PERIMETER', 'territory.eastWest': 'WEST–EAST',
  'territory.northSouth': 'NORTH–SOUTH', 'territory.share': 'of the total mapped area of the 15 provinces', 'territory.centers': 'CENTERS',
  'territory.cantons': 'CANTONS', 'territory.geography': 'GEOGRAPHY', 'territory.presentAreas': 'PRESENT-DAY AREAS',
  'territory.measurementNote': 'Measurements are calculated from the GeoJSON boundaries using WGS84 geodesic methods and rounded. Historical boundaries are interpretive, so the figures are approximate cartographic estimates.',
  'territory.heritage': 'Heritage highlights', 'territory.timeline': 'Timeline',
  'settings.eyebrow': 'PERSONALIZATION', 'settings.title': 'Settings', 'settings.appearance': 'Appearance',
  'settings.appearanceDescription': 'Choose the atlas color environment', 'settings.system': 'System', 'settings.light': 'Light', 'settings.dark': 'Dark',
  'settings.language': 'Language', 'settings.languageDescription': 'Choose the primary application language',
  'settings.mapDisplay': 'Map display', 'settings.mapDisplayDescription': 'Control names and layer details',
  'settings.mapLabels': 'Map labels', 'settings.mapLabelsDescription': 'Show province and division names on the map',
  'settings.modernNames': 'Modern names', 'settings.modernNamesDescription': 'Show the current international name beside the Armenian name',
  'settings.interaction': 'Interaction', 'settings.interactionDescription': 'Customize motion and Telegram feedback',
  'settings.haptics': 'Haptic feedback', 'settings.hapticsDescription': 'Light vibration during navigation and saving',
  'settings.reduceMotion': 'Reduce animations', 'settings.reduceMotionDescription': 'Use calmer transitions and less movement',
  'settings.data': 'Data and storage', 'settings.dataDescription': 'Manage local map data',
  'settings.clearCache': 'Clear city cache', 'settings.clearCacheDescription': 'Data will be downloaded again on the next open',
  'settings.resetAtlas': 'Reset personal atlas', 'settings.resetAtlasDescription': 'Remove saved and viewed provinces',
  'settings.cacheCleared': 'The offline city cache has been cleared.', 'settings.atlasReset': 'The local atlas state has been reset.',
  'settings.about': 'Armenian Atlas', 'settings.version': 'Version 2.1.0 · redesigned multilingual UI',
  'settings.disclaimer': 'Historical boundaries and measurements are cartographic estimates and can be expanded with specialist sources.',
};

const ru: Dictionary = {
  ...en,
  'brand.title': 'Армянский Атлас', 'brand.tagline': 'ИСТОРИЧЕСКАЯ КАРТА · НАСЛЕДИЕ · МЕСТА',
  'nav.map': 'Карта', 'nav.browse': 'Поиск', 'nav.saved': 'Сохранено', 'nav.profile': 'Профиль',
  'aria.mainNav': 'Главная навигация', 'aria.goMap': 'Перейти к карте', 'aria.search': 'Поиск по атласу', 'aria.openSaved': 'Открыть сохранённые места',
  'aria.closeSearch': 'Закрыть поиск', 'aria.toggleSaved': 'Изменить состояние сохранения', 'aria.saveProvince': 'Сохранить провинцию',
  'aria.toggleDetails': 'Открыть или закрыть сведения о территории', 'aria.mapMode': 'Режим отображения карты',
  'aria.divisionFilter': 'Фильтр Западной и Восточной Армении', 'aria.eraFilter': 'Фильтр современных и исторических мест',
  'aria.resetMap': 'Сбросить вид карты', 'aria.zoomControls': 'Управление масштабом карты', 'aria.zoomIn': 'Увеличить', 'aria.zoomOut': 'Уменьшить',
  'browse.eyebrow': 'ИССЛЕДОВАТЬ', 'browse.title': 'Каталог атласа', 'browse.subtitle': '15 провинций · современные и исторические города и места',
  'browse.placeholder': 'Ани, Айрарат, Ван, Шуши…', 'browse.provinces': 'Провинции',
  'map.provinces': '15 провинций', 'map.divisions': 'Западная / Восточная', 'map.loadingPlaces': 'Загрузка мест…', 'map.places': '{count} мест',
  'map.all': 'Все', 'map.western': 'Западная', 'map.eastern': 'Восточная', 'map.present': 'Современные', 'map.historical': 'Исторические',
  'map.refreshing': 'Обновление…', 'map.offline': 'Офлайн-база', 'map.live': 'OSM в реальном времени', 'map.database': 'База населённых пунктов OpenStreetMap',
  'map.legend': 'Легенда разделения карты', 'map.provinceCount': '{count} провинций', 'map.residents': '{count} жителей', 'map.loadError': 'Не удалось загрузить данные карты',
  'division.western': 'Западная Армения', 'division.eastern': 'Восточная Армения',
  'era.present': 'Современное', 'era.historical': 'Историческое', 'era.both': 'Современное и историческое',
  'saved.eyebrow': 'МОЯ КОЛЛЕКЦИЯ', 'saved.title': 'Сохранённые места', 'saved.subtitle': 'Сохраняйте провинции для быстрого доступа',
  'saved.emptyTitle': 'Пока ничего не сохранено', 'saved.emptyText': 'Нажмите значок закладки на карте, чтобы создать личный исторический путеводитель.',
  'saved.openMap': 'Открыть карту', 'saved.recommended': 'Рекомендуемые места',
  'profile.visitor': 'Посетитель армянского наследия', 'profile.initials': 'АА', 'profile.eyebrow': 'МОЙ АТЛАС', 'profile.guide': 'Личный исторический путеводитель',
  'profile.progress': 'Прогресс исследования', 'profile.completed': 'Завершено: {count}%', 'profile.viewedProgress': 'Просмотрено {visited} из {total} провинций',
  'profile.viewed': 'Просмотрено', 'profile.saved': 'Сохранено', 'profile.province': 'Провинций',
  'profile.savedPlaces': 'Сохранённые места', 'profile.savedDescription': 'Выбранные провинции и путеводители',
  'profile.settings': 'Настройки', 'profile.settingsDescription': 'Тема, язык, карта, отклик и данные',
  'profile.share': 'Поделиться атласом', 'profile.shareDescription': 'Отправить друзьям или скопировать ссылку',
  'profile.recent': 'Недавно просмотрено', 'profile.startHere': 'Начните отсюда',
  'profile.shareTitle': 'Армянский Атлас', 'profile.shareText': 'Откройте 15 провинций, города и исторические места Великой Армении.',
  'search.eyebrow': 'ПОИСК ПО АТЛАСУ', 'search.title': 'Найти современное или историческое место', 'search.placeholder': 'Ани, Ван, Карин, Эрзурум, Шуши…',
  'search.loading': 'Загрузка полного каталога населённых пунктов…', 'search.databaseStatus': '{count} мест · армянские, современные и прежние названия',
  'search.provinces': 'Провинции', 'search.places': 'Города, поселения и исторические места',
  'search.empty': 'Ничего не найдено. Попробуйте армянское, современное или прежнее название.',
  'card.area': 'Площадь', 'card.perimeter': 'Периметр', 'card.openOnMap': 'Открыть на карте',
  'territory.previousNames': 'Прежние названия:', 'territory.closeDetails': 'Закрыть подробности', 'territory.openAll': 'Открыть все места: {count}',
  'territory.allPlaces': 'Все города и места', 'territory.presentCount': 'Современные:', 'territory.historicalCount': 'Исторические:',
  'territory.searchPlaceholder': 'Поиск по армянскому, современному или прежнему названию…', 'territory.noPlace': 'Место с таким названием не найдено.',
  'territory.dossier': 'Сведения о территории', 'territory.area': 'ПЛОЩАДЬ', 'territory.perimeter': 'ПЕРИМЕТР', 'territory.eastWest': 'ЗАПАД–ВОСТОК',
  'territory.northSouth': 'СЕВЕР–ЮГ', 'territory.share': 'от общей картографированной площади 15 провинций', 'territory.centers': 'ЦЕНТРЫ',
  'territory.cantons': 'ГАВАРЫ', 'territory.geography': 'ГЕОГРАФИЯ', 'territory.presentAreas': 'СОВРЕМЕННЫЕ ТЕРРИТОРИИ',
  'territory.measurementNote': 'Измерения рассчитаны по границам GeoJSON геодезическим методом WGS84 и округлены. Исторические границы интерпретативны, поэтому значения являются приблизительными картографическими оценками.',
  'territory.heritage': 'Ключевые объекты наследия', 'territory.timeline': 'Хронология',
  'settings.eyebrow': 'ПЕРСОНАЛИЗАЦИЯ', 'settings.title': 'Настройки', 'settings.appearance': 'Оформление',
  'settings.appearanceDescription': 'Выберите цветовую тему атласа', 'settings.system': 'Система', 'settings.light': 'Светлая', 'settings.dark': 'Тёмная',
  'settings.language': 'Язык', 'settings.languageDescription': 'Выберите основной язык приложения',
  'settings.mapDisplay': 'Отображение карты', 'settings.mapDisplayDescription': 'Управляйте названиями и деталями слоёв',
  'settings.mapLabels': 'Подписи на карте', 'settings.mapLabelsDescription': 'Показывать названия провинций и разделов на карте',
  'settings.modernNames': 'Современные названия', 'settings.modernNamesDescription': 'Показывать современное международное название рядом с армянским',
  'settings.interaction': 'Взаимодействие', 'settings.interactionDescription': 'Настройте анимацию и отклик Telegram',
  'settings.haptics': 'Тактильный отклик', 'settings.hapticsDescription': 'Лёгкая вибрация при навигации и сохранении',
  'settings.reduceMotion': 'Уменьшить анимации', 'settings.reduceMotionDescription': 'Более спокойные переходы и меньше движения',
  'settings.data': 'Данные и хранилище', 'settings.dataDescription': 'Управляйте локальными данными карты',
  'settings.clearCache': 'Очистить кэш городов', 'settings.clearCacheDescription': 'Данные загрузятся снова при следующем открытии',
  'settings.resetAtlas': 'Сбросить личный атлас', 'settings.resetAtlasDescription': 'Удалить сохранённые и просмотренные провинции',
  'settings.cacheCleared': 'Офлайн-кэш городов очищен.', 'settings.atlasReset': 'Локальное состояние атласа сброшено.',
  'settings.about': 'Армянский Атлас', 'settings.version': 'Версия 2.1.0 · обновлённый многоязычный интерфейс',
  'settings.disclaimer': 'Исторические границы и измерения являются картографическими оценками и могут быть дополнены специализированными источниками.',
};

const tr: Dictionary = {
  ...en,
  'brand.title': 'Ermeni Atlası', 'brand.tagline': 'TARİHÎ HARİTA · MİRAS · YERLER',
  'nav.map': 'Harita', 'nav.browse': 'Ara', 'nav.saved': 'Kaydedilen', 'nav.profile': 'Profil',
  'aria.mainNav': 'Ana gezinme', 'aria.goMap': 'Haritaya git', 'aria.search': 'Atlasta ara', 'aria.openSaved': 'Kaydedilen yerleri aç',
  'aria.closeSearch': 'Aramayı kapat', 'aria.toggleSaved': 'Kaydetme durumunu değiştir', 'aria.saveProvince': 'Eyaleti kaydet',
  'aria.toggleDetails': 'Bölge ayrıntılarını aç veya kapat', 'aria.mapMode': 'Harita görüntüleme modu',
  'aria.divisionFilter': 'Batı ve Doğu Ermenistan filtresi', 'aria.eraFilter': 'Günümüz ve tarihî yer filtresi',
  'aria.resetMap': 'Harita görünümünü sıfırla', 'aria.zoomControls': 'Harita yakınlaştırma denetimleri', 'aria.zoomIn': 'Yakınlaştır', 'aria.zoomOut': 'Uzaklaştır',
  'browse.eyebrow': 'KEŞFET', 'browse.title': 'Atlas dizini', 'browse.subtitle': '15 eyalet · günümüz ve tarihî tüm kentsel yerler',
  'browse.placeholder': 'Ani, Ayrarat, Van, Şuşi…', 'browse.provinces': 'Eyaletler',
  'map.provinces': '15 eyalet', 'map.divisions': 'Batı / Doğu', 'map.loadingPlaces': 'Yerler yükleniyor…', 'map.places': '{count} yer',
  'map.all': 'Tümü', 'map.western': 'Batı', 'map.eastern': 'Doğu', 'map.present': 'Günümüz', 'map.historical': 'Tarihî',
  'map.refreshing': 'Yenileniyor…', 'map.offline': 'Çevrimdışı veri', 'map.live': 'Canlı OSM', 'map.database': 'OpenStreetMap yerleşim veritabanı',
  'map.legend': 'Harita bölüm açıklaması', 'map.provinceCount': '{count} eyalet', 'map.residents': '{count} sakin', 'map.loadError': 'Harita verileri yüklenemedi',
  'division.western': 'Batı Ermenistan', 'division.eastern': 'Doğu Ermenistan',
  'era.present': 'Günümüz', 'era.historical': 'Tarihî', 'era.both': 'Günümüz ve tarihî',
  'saved.eyebrow': 'KOLEKSİYONUM', 'saved.title': 'Kaydedilen yerler', 'saved.subtitle': 'Hızlı erişim için eyaletleri kaydedin',
  'saved.emptyTitle': 'Henüz kaydedilmiş eyalet yok', 'saved.emptyText': 'Kişisel tarihî rehberinizi oluşturmak için haritadaki yer imi düğmesine dokunun.',
  'saved.openMap': 'Haritayı aç', 'saved.recommended': 'Önerilen yerler',
  'profile.visitor': 'Ermeni mirası ziyaretçisi', 'profile.initials': 'EA', 'profile.eyebrow': 'ATLASIM', 'profile.guide': 'Kişisel tarihî rehber',
  'profile.progress': 'Keşif ilerlemesi', 'profile.completed': '%{count} tamamlandı', 'profile.viewedProgress': '{total} eyaletten {visited} tanesi görüntülendi',
  'profile.viewed': 'Görüntülenen', 'profile.saved': 'Kaydedilen', 'profile.province': 'Eyalet',
  'profile.savedPlaces': 'Kaydedilen yerler', 'profile.savedDescription': 'Seçtiğiniz eyaletler ve rehberler',
  'profile.settings': 'Ayarlar', 'profile.settingsDescription': 'Görünüm, dil, harita, geri bildirim ve veriler',
  'profile.share': 'Atlası paylaş', 'profile.shareDescription': 'Arkadaşlara gönderin veya bağlantıyı kopyalayın',
  'profile.recent': 'Son görüntülenenler', 'profile.startHere': 'Buradan başlayın',
  'profile.shareTitle': 'Ermeni Atlası', 'profile.shareText': 'Büyük Ermenistan’ın 15 eyaletini, şehirlerini ve tarihî yerlerini keşfedin.',
  'search.eyebrow': 'ATLAS ARAMASI', 'search.title': 'Günümüz veya tarihî bir yer bulun', 'search.placeholder': 'Ani, Van, Karin, Erzurum, Şuşi…',
  'search.loading': 'Yerleşim kataloğunun tamamı yükleniyor…', 'search.databaseStatus': '{count} yer · Ermenice, modern ve eski adlar',
  'search.provinces': 'Eyaletler', 'search.places': 'Şehirler, yerleşimler ve tarihî yerler',
  'search.empty': 'Sonuç bulunamadı. Ermenice, modern veya eski bir ad deneyin.',
  'card.area': 'Alan', 'card.perimeter': 'Çevre', 'card.openOnMap': 'Haritada aç',
  'territory.previousNames': 'Eski adlar:', 'territory.closeDetails': 'Ayrıntıları kapat', 'territory.openAll': 'Tüm {count} yeri aç',
  'territory.allPlaces': 'Tüm şehirler ve yerler', 'territory.presentCount': 'Günümüz:', 'territory.historicalCount': 'Tarihî:',
  'territory.searchPlaceholder': 'Ermenice, modern veya eski ada göre ara…', 'territory.noPlace': 'Bu adla bir yer bulunamadı.',
  'territory.dossier': 'Bölge dosyası', 'territory.area': 'ALAN', 'territory.perimeter': 'ÇEVRE', 'territory.eastWest': 'BATI–DOĞU',
  'territory.northSouth': 'KUZEY–GÜNEY', 'territory.share': '15 eyaletin toplam haritalanmış alanındaki pay', 'territory.centers': 'MERKEZLER',
  'territory.cantons': 'GAVARLAR', 'territory.geography': 'COĞRAFYA', 'territory.presentAreas': 'GÜNÜMÜZ BÖLGELERİ',
  'territory.measurementNote': 'Ölçümler GeoJSON sınırlarından WGS84 jeodezik yöntemiyle hesaplanmış ve yuvarlanmıştır. Tarihî sınırlar yoruma açık olduğundan değerler yaklaşık kartografik tahminlerdir.',
  'territory.heritage': 'Miras odakları', 'territory.timeline': 'Zaman çizelgesi',
  'settings.eyebrow': 'KİŞİSELLEŞTİRME', 'settings.title': 'Ayarlar', 'settings.appearance': 'Görünüm',
  'settings.appearanceDescription': 'Atlasın renk ortamını seçin', 'settings.system': 'Sistem', 'settings.light': 'Açık', 'settings.dark': 'Koyu',
  'settings.language': 'Dil', 'settings.languageDescription': 'Uygulamanın ana dilini seçin',
  'settings.mapDisplay': 'Harita görünümü', 'settings.mapDisplayDescription': 'Adları ve katman ayrıntılarını yönetin',
  'settings.mapLabels': 'Harita etiketleri', 'settings.mapLabelsDescription': 'Eyalet ve bölüm adlarını haritada göster',
  'settings.modernNames': 'Modern adlar', 'settings.modernNamesDescription': 'Ermenice adın yanında güncel uluslararası adı göster',
  'settings.interaction': 'Etkileşim', 'settings.interactionDescription': 'Hareketi ve Telegram geri bildirimini özelleştirin',
  'settings.haptics': 'Dokunsal geri bildirim', 'settings.hapticsDescription': 'Gezinme ve kaydetme sırasında hafif titreşim',
  'settings.reduceMotion': 'Animasyonları azalt', 'settings.reduceMotionDescription': 'Daha sakin geçişler ve daha az hareket',
  'settings.data': 'Veri ve depolama', 'settings.dataDescription': 'Yerel harita verilerini yönetin',
  'settings.clearCache': 'Şehir önbelleğini temizle', 'settings.clearCacheDescription': 'Veriler bir sonraki açılışta yeniden indirilir',
  'settings.resetAtlas': 'Kişisel atlası sıfırla', 'settings.resetAtlasDescription': 'Kaydedilen ve görüntülenen eyaletleri kaldır',
  'settings.cacheCleared': 'Çevrimdışı şehir önbelleği temizlendi.', 'settings.atlasReset': 'Yerel atlas durumu sıfırlandı.',
  'settings.about': 'Ermeni Atlası', 'settings.version': 'Sürüm 2.1.0 · yenilenen çok dilli arayüz',
  'settings.disclaimer': 'Tarihî sınırlar ve ölçümler kartografik tahminlerdir ve uzman kaynaklarla genişletilebilir.',
};

const az: Dictionary = {
  ...en,
  'brand.title': 'Erməni Atlası', 'brand.tagline': 'TARİXİ XƏRİTƏ · İRS · MƏKANLAR',
  'nav.map': 'Xəritə', 'nav.browse': 'Axtarış', 'nav.saved': 'Saxlanılan', 'nav.profile': 'Profil',
  'aria.mainNav': 'Əsas naviqasiya', 'aria.goMap': 'Xəritəyə keç', 'aria.search': 'Atlasda axtar', 'aria.openSaved': 'Saxlanılan məkanları aç',
  'aria.closeSearch': 'Axtarışı bağla', 'aria.toggleSaved': 'Saxlama vəziyyətini dəyiş', 'aria.saveProvince': 'Vilayəti saxla',
  'aria.toggleDetails': 'Ərazi təfərrüatlarını aç və ya bağla', 'aria.mapMode': 'Xəritə göstərmə rejimi',
  'aria.divisionFilter': 'Qərbi və Şərqi Ermənistan filtri', 'aria.eraFilter': 'Müasir və tarixi məkan filtri',
  'aria.resetMap': 'Xəritə görünüşünü sıfırla', 'aria.zoomControls': 'Xəritə miqyası idarələri', 'aria.zoomIn': 'Yaxınlaşdır', 'aria.zoomOut': 'Uzaqlaşdır',
  'browse.eyebrow': 'KƏŞF ET', 'browse.title': 'Atlas kataloqu', 'browse.subtitle': '15 vilayət · müasir və tarixi bütün şəhər məkanları',
  'browse.placeholder': 'Ani, Ayrarat, Van, Şuşi…', 'browse.provinces': 'Vilayətlər',
  'map.provinces': '15 vilayət', 'map.divisions': 'Qərb / Şərq', 'map.loadingPlaces': 'Məkanlar yüklənir…', 'map.places': '{count} məkan',
  'map.all': 'Hamısı', 'map.western': 'Qərb', 'map.eastern': 'Şərq', 'map.present': 'Müasir', 'map.historical': 'Tarixi',
  'map.refreshing': 'Yenilənir…', 'map.offline': 'Oflayn baza', 'map.live': 'Canlı OSM', 'map.database': 'OpenStreetMap yaşayış məntəqələri bazası',
  'map.legend': 'Xəritə bölünməsi izahı', 'map.provinceCount': '{count} vilayət', 'map.residents': '{count} sakin', 'map.loadError': 'Xəritə məlumatlarını yükləmək mümkün olmadı',
  'division.western': 'Qərbi Ermənistan', 'division.eastern': 'Şərqi Ermənistan',
  'era.present': 'Müasir', 'era.historical': 'Tarixi', 'era.both': 'Müasir və tarixi',
  'saved.eyebrow': 'KOLLEKSİYAM', 'saved.title': 'Saxlanılan məkanlar', 'saved.subtitle': 'Sürətli giriş üçün vilayətləri saxlayın',
  'saved.emptyTitle': 'Hələ saxlanılan vilayət yoxdur', 'saved.emptyText': 'Şəxsi tarixi bələdçinizi yaratmaq üçün xəritədə əlfəcin düyməsinə toxunun.',
  'saved.openMap': 'Xəritəni aç', 'saved.recommended': 'Tövsiyə olunan məkanlar',
  'profile.visitor': 'Erməni irsi ziyarətçisi', 'profile.initials': 'EA', 'profile.eyebrow': 'ATLASIM', 'profile.guide': 'Şəxsi tarixi bələdçi',
  'profile.progress': 'Kəşf irəliləyişi', 'profile.completed': '{count}% tamamlanıb', 'profile.viewedProgress': '{total} vilayətdən {visited}-i baxılıb',
  'profile.viewed': 'Baxılıb', 'profile.saved': 'Saxlanılıb', 'profile.province': 'Vilayət',
  'profile.savedPlaces': 'Saxlanılan məkanlar', 'profile.savedDescription': 'Seçilmiş vilayətləriniz və bələdçiləriniz',
  'profile.settings': 'Parametrlər', 'profile.settingsDescription': 'Görünüş, dil, xəritə, cavab və məlumatlar',
  'profile.share': 'Atlası paylaş', 'profile.shareDescription': 'Dostlara göndərin və ya keçidi kopyalayın',
  'profile.recent': 'Son baxılanlar', 'profile.startHere': 'Buradan başlayın',
  'profile.shareTitle': 'Erməni Atlası', 'profile.shareText': 'Böyük Ermənistanın 15 vilayətini, şəhərlərini və tarixi məkanlarını kəşf edin.',
  'search.eyebrow': 'ATLAS AXTARIŞI', 'search.title': 'Müasir və ya tarixi məkan tapın', 'search.placeholder': 'Ani, Van, Karin, Ərzurum, Şuşi…',
  'search.loading': 'Tam yaşayış məntəqələri kataloqu yüklənir…', 'search.databaseStatus': '{count} məkan · ermənicə, müasir və əvvəlki adlarla',
  'search.provinces': 'Vilayətlər', 'search.places': 'Şəhərlər, yaşayış məntəqələri və tarixi məkanlar',
  'search.empty': 'Heç nə tapılmadı. Ermənicə, müasir və ya əvvəlki adı yoxlayın.',
  'card.area': 'Sahə', 'card.perimeter': 'Perimetr', 'card.openOnMap': 'Xəritədə aç',
  'territory.previousNames': 'Əvvəlki adlar:', 'territory.closeDetails': 'Təfərrüatları bağla', 'territory.openAll': 'Bütün {count} məkanı aç',
  'territory.allPlaces': 'Bütün şəhərlər və məkanlar', 'territory.presentCount': 'Müasir:', 'territory.historicalCount': 'Tarixi:',
  'territory.searchPlaceholder': 'Ermənicə, müasir və ya əvvəlki ada görə axtar…', 'territory.noPlace': 'Bu adla məkan tapılmadı.',
  'territory.dossier': 'Ərazi dosyesi', 'territory.area': 'SAHƏ', 'territory.perimeter': 'PERİMETR', 'territory.eastWest': 'QƏRB–ŞƏRQ',
  'territory.northSouth': 'ŞİMAL–CƏNUB', 'territory.share': '15 vilayətin ümumi xəritələnmiş sahəsində pay', 'territory.centers': 'MƏRKƏZLƏR',
  'territory.cantons': 'QAVARLAR', 'territory.geography': 'COĞRAFİYA', 'territory.presentAreas': 'MÜASİR ƏRAZİLƏR',
  'territory.measurementNote': 'Ölçmələr GeoJSON sərhədlərindən WGS84 geodezik üsulu ilə hesablanıb və yuvarlaqlaşdırılıb. Tarixi sərhədlər şərhi olduğundan rəqəmlər təxmini kartoqrafik qiymətləndirmələrdir.',
  'territory.heritage': 'İrs məqamları', 'territory.timeline': 'Xronologiya',
  'settings.eyebrow': 'FƏRDİLƏŞDİRMƏ', 'settings.title': 'Parametrlər', 'settings.appearance': 'Görünüş',
  'settings.appearanceDescription': 'Atlasın rəng mühitini seçin', 'settings.system': 'Sistem', 'settings.light': 'İşıqlı', 'settings.dark': 'Tünd',
  'settings.language': 'Dil', 'settings.languageDescription': 'Tətbiqin əsas dilini seçin',
  'settings.mapDisplay': 'Xəritə görünüşü', 'settings.mapDisplayDescription': 'Adları və qat təfərrüatlarını idarə edin',
  'settings.mapLabels': 'Xəritə etiketləri', 'settings.mapLabelsDescription': 'Vilayət və bölmə adlarını xəritədə göstər',
  'settings.modernNames': 'Müasir adlar', 'settings.modernNamesDescription': 'Ermənicə adın yanında cari beynəlxalq adı göstər',
  'settings.interaction': 'Qarşılıqlı əlaqə', 'settings.interactionDescription': 'Hərəkəti və Telegram cavabını fərdiləşdirin',
  'settings.haptics': 'Toxunma cavabı', 'settings.hapticsDescription': 'Naviqasiya və saxlama zamanı yüngül vibrasiya',
  'settings.reduceMotion': 'Animasiyaları azalt', 'settings.reduceMotionDescription': 'Daha sakit keçidlər və daha az hərəkət',
  'settings.data': 'Məlumat və yaddaş', 'settings.dataDescription': 'Yerli xəritə məlumatlarını idarə edin',
  'settings.clearCache': 'Şəhər keşini təmizlə', 'settings.clearCacheDescription': 'Məlumatlar növbəti açılışda yenidən endiriləcək',
  'settings.resetAtlas': 'Şəxsi atlası sıfırla', 'settings.resetAtlasDescription': 'Saxlanılan və baxılan vilayətləri sil',
  'settings.cacheCleared': 'Oflayn şəhər keşi təmizləndi.', 'settings.atlasReset': 'Yerli atlas vəziyyəti sıfırlandı.',
  'settings.about': 'Erməni Atlası', 'settings.version': 'Versiya 2.1.0 · yenilənmiş çoxdilli interfeys',
  'settings.disclaimer': 'Tarixi sərhədlər və ölçmələr kartoqrafik qiymətləndirmələrdir və mütəxəssis mənbələri ilə genişləndirilə bilər.',
};

const dictionaries: Record<AtlasLanguage, Dictionary> = { am, en, ru, tr, az };

const provinceNames: Record<Exclude<AtlasLanguage, 'am' | 'en'>, Record<ProvinceId, string>> = {
  ru: {
    gugark: 'Гугарк', tayk: 'Тайк', 'upper-armenia': 'Верхняя Армения', ayrarat: 'Айрарат', utik: 'Утик', artsakh: 'Арцах',
    paytakaran: 'Пайтакаран', syunik: 'Сюник', vaspurakan: 'Васпуракан', turuberan: 'Туруберан', tsopk: 'Цопк',
    aghdznik: 'Ахдзник', moks: 'Мокк', korchayk: 'Корчайк', parskahayk: 'Персармения',
  },
  tr: {
    gugark: 'Gugark', tayk: 'Tayk', 'upper-armenia': 'Yukarı Ermenistan', ayrarat: 'Ayrarat', utik: 'Utik', artsakh: 'Artsakh',
    paytakaran: 'Paytakaran', syunik: 'Syunik', vaspurakan: 'Vaspurakan', turuberan: 'Turuberan', tsopk: 'Tsopk',
    aghdznik: 'Aghdznik', moks: 'Moks', korchayk: 'Korchayk', parskahayk: 'Persarmenia',
  },
  az: {
    gugark: 'Quqark', tayk: 'Tayk', 'upper-armenia': 'Yuxarı Ermənistan', ayrarat: 'Ayrarat', utik: 'Utik', artsakh: 'Artsax',
    paytakaran: 'Paytakaran', syunik: 'Sünik', vaspurakan: 'Vaspurakan', turuberan: 'Turuberan', tsopk: 'Tsopk',
    aghdznik: 'Ağdznik', moks: 'Moks', korchayk: 'Korçayk', parskahayk: 'Persarmeniya',
  },
};

interface I18nValue {
  language: AtlasLanguage;
  locale: string;
  t: (key: string, variables?: Record<string, string | number>) => string;
  provinceName: (province: Province) => string;
  provinceSecondaryName: (province: Province) => string;
  cityName: (city: City) => string;
  divisionName: (division: Division) => string;
  eraLabel: (city: City) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

function interpolate(value: string, variables?: Record<string, string | number>): string {
  if (!variables) return value;
  return Object.entries(variables).reduce((result, [key, replacement]) => result.replaceAll(`{${key}}`, String(replacement)), value);
}

export function I18nProvider({ language, children }: { language: AtlasLanguage; children: ReactNode }) {
  const value = useMemo<I18nValue>(() => {
    const dictionary = dictionaries[language] ?? dictionaries.am;
    const t = (key: string, variables?: Record<string, string | number>) => interpolate(dictionary[key] ?? en[key] ?? key, variables);
    const provinceName = (province: Province) => {
      if (language === 'am') return province.nameHy;
      if (language === 'en') return province.nameEn;
      return provinceNames[language][province.id] ?? province.nameEn;
    };
    const provinceSecondaryName = (province: Province) => language === 'am' ? province.nameEn : province.nameHy;
    const cityName = (city: City) => language === 'am' ? city.nameHy : city.nameEn;
    const divisionName = (division: Division) => t(`division.${division}`);
    const eraLabel = (city: City) => {
      const categoryHistorical = city.category === 'site' || city.category === 'monastery' || city.category === 'fortress';
      const era = city.era ?? (categoryHistorical ? 'historical' : city.source === 'openstreetmap' ? 'present' : 'both');
      return t(`era.${era}`);
    };
    return { language, locale: localeByLanguage[language], t, provinceName, provinceSecondaryName, cityName, divisionName, eraLabel };
  }, [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside I18nProvider');
  return value;
}
