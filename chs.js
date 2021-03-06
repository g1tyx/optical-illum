/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'Save': '保存',
    'Export': '导出',
    'Import': '导入',
    'Settings': '设置',
    'Achievements': '成就',
    'Statistics': '统计',
    'Changelog': '更新日志',
    'Hotkeys': '快捷键',
    'Build': '建造',
    'Delete': '删除',
    'Delete All Objects': '删除所有对象',
    'Filter mode': '过滤模式',
    'Ray afterglow decay': '射线余辉衰变',
    'Show highest rate': '显示最高比率',
    'Solar panel mode': '太阳能板模式',
    'Sound': '声音',
    'Stats': '统计',
    'Upgrades': '升级',
    'Detector': '检测器',
    'Light Source': '光源',
    'Normal': '正常',
    'Solar Panel': '太阳能板',
    'off': '关',
    'paused': '暂停',
    'nil': 'nil',
    'none': '无',
    'quick': '快速',
    'persist': '持续',
    'stopped': '停止',
    'there\'s no audio': '没有音频',
    'true': '是',
    'unavailable': '不可用',
    'nada': 'nada',
    'muted': '静音',
    'false': '否',
    'disabled': '禁用',
    'dis-enabled': '禁用',
    'blocked': '阻塞',
    'Gamma Rays Only': '只有伽马射线',
    'Filter': '过滤器',
    'Energizer': '增能器',
    'Lens': '透镜',
    'Locked': '未解锁',
    'Mirror': '镜子',
    'Normalizer': '标准化器',
    'Prism': '棱镜',
    'Red Shifter': '红色移位器',
    'Blue Shifter': '蓝色移位器',
    'Green Shifter': '绿色移位器',
    "Gamma Rays": "伽马射线",
    'Infrared': '红外线',
    'Ultraviolet': '紫外线',
    'X-ray': 'X射线',
    'Blue Light': '蓝光',
    'Produces light in random directions. Any light rays will be unable to interact with objects until they exit the radius.': '沿随机方向发光。 除非光线离开半径，否则任何光线都将无法与它们进行交互。',
    'A solar panel which converts incoming light rays into energy. It has various modes which can make use of different light for improved energy generation.\n\nCurrently, it will produce energy optimized for blue light. However, red and green wavelength light will prevent the solar panel from working': '一种将入射光线转换成能量的太阳能电池板。 它具有多种模式，可以利用不同的光来改善能量的产生。\n\n当前，它将产生针对蓝光优化的能量。 但是，红色和绿色波长的光会阻止太阳能电池板工作',
    'A solar panel which converts incoming light rays into energy. It has various modes which can make use of different light for improved energy generation.\n\nCurrently, it will produce a greatly increased amount of energy from ultraviolet light.': '一种将入射光线转换成能量的太阳能电池板。 它具有多种模式，可以利用不同的光来改善能量的产生。\n\n当前，它将通过紫外线产生大量增加的能量。',
    'A solar panel which converts incoming light rays into energy. It has various modes which can make use of different light for improved energy generation.\n\nCurrently, it can produce an overwhelming amount of energy from Gamma radiation.': '一种将入射光线转换成能量的太阳能电池板。 它具有多种模式，可以利用不同的光来改善能量的产生。\n\n当前，它可以从伽马射线产生大量能量。',
    'A solar panel which converts incoming light rays into energy. It has various modes which can make use of different light for improved energy generation.\n\nCurrently, it can produce an increased amount of energy from infrared light.': '一种将入射光线转换成能量的太阳能电池板。 它具有多种模式，可以利用不同的光来改善能量的产生。\n\n当前，它可以从红外光中产生更多的能量。',
    'A solar panel which converts incoming light rays into energy. It has various modes which can make use of different light for improved energy generation.\n\nCurrently, it can produce an exceptional amount of energy from X-Ray radiation.': '一种将入射光线转换成能量的太阳能电池板。 它具有多种模式，可以利用不同的光来改善能量的产生。\n\n当前，它可以通过X射线辐射产生大量的能量。',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    'No Light': '无光线',
    'X-ray Only': '只有X射线',
    'Infrared Only': '只有红外线',
    'Green Only': '只有绿色',
    'Blue Only': '只有蓝色',
    'Red Only': '只有红色',
    'Ultraviolet Only': '只有紫外线',
    'All Light': '所有光',
    'A panel that will only allow certain wavelengths of light through, depending on the mode.': '一种只允许特定波长的光通过的面板，这取决于模式。',
    'A solar panel which converts incoming light rays into energy. It has various modes which can make use of different light for improved energy generation.\n\nCurrently, it will produce energy off of the red, green, and blue visible light spectrum.': '一种将入射光线转换成能量的太阳能电池板。 它具有多种模式，可以利用不同的光来改善能量的产生。\n\n当前，它将从红色，绿色和蓝色可见光谱中产生能量。',

    //树游戏
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "(-": "(-",
    "(+": "(+",
    "(": "(",
    "-": "-",
    "+": "+",
    " ": " ",
    ": ": "： ",
    "\n": "",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    //树游戏
    "Show Milestones: ": "显示里程碑：",
    "Autosave: ": "自动保存: ",
    "Offline Prod: ": "离线生产: ",
    "Completed Challenges: ": "完成的挑战: ",
    "High-Quality Tree: ": "高质量树贴图: ",
    "Offline Time: ": "离线时间: ",
    "Theme: ": "主题: ",
    "Light Filter\nA material that can filter out different kinds of light. Unfiltered light loses no energy.": "滤光片\n一种可以滤除各种光的材料。 未经过滤的光不会损失任何能量。",
    "Large Mirror\nA larger reflective panel. Reflects rays out at an equal but opposite angle as of incoming lights. Effective on all electromagnetic waves.\n\nCurrent upgrades allows for the mirror to reflect light with 50% of the incoming energy.": "大镜子\n更大的反光板。 以与入射光相同但相反的角度反射光线。 对所有电磁波均有效。\n\n当前的升级允许反射镜以入射能量的50％反射光。",
    "Solar Panel\nAn object that collects light and produces power. Can be upgraded to optimize for different types of electromagnetic waves.": "太阳能电池板\n收集光并发电的物体。 可以升级以针对不同类型的电磁波进行优化。",
    "Detector\nAn informational panel that describes the photons passing through it. Does not affect the rays.": "检测器\n一个信息面板，描述通过它的光子。 不影响光线。",
    "Light Source\nIt produces light. That\'s what you're trying to get. You should get the light. That would be good.": "光源\n它会产生光。 那就是你想要得到的。 你应该得到光。 那会很好。",
    "Convex Lens\nA thin lens which bends light rays towards the center axis. Effective on all electromagnetic waves.\n\nCurrent upgrades allows light to pass through with 90% of the incoming energy.": "凸透镜\n将光线弯曲到中心轴的薄透镜。 对所有电磁波均有效。\n\n当前升级允许光以90％的入射能量通过。",
    "Increase maximum normalizers by 1": "将最大标准化器增加1",
    "An informational panel that describes the photons passing through it.": "一个信息面板，描述通过它的光子。",
    "Increase energizer efficiency by 10%": "激励效率提高10％",
    "Increase maximum energizers by 1": "将能量上限增加1",
    "Increase maximum filters by 3": "将过滤器上限增加3",
    "Increase maximum filters by 5": "将过滤器上限增加5",
    "Increase maximum large mirrors by 2": "将大镜子上限增加2",
    "Increase maximum large mirrors by 5": "将大镜子上限增加5",
    "Increase maximum light sources by 1": "将光源上限增加1",
    "Unlocks gamma ray cascader": "解锁伽玛射线级联器",
    "Unlocks x-ray tubes": "解锁X射线管",
    "Stored infrared energy: ": "储存的红外能量：",
    "Red Shifter\nA machine which will extend the wavelength of incoming light. Converts pure red light into infrared light; green light into red light; etc. \n\nTakes in light on the right side.\n\nIt is 90% efficient.": "红色移位器\n一个机器，它将延长入射光的波长。 将纯红光转换为红外光； 绿光变为红光； 等等。\n\n在右侧照亮。\n\n效率为90％。",
    "Normalizer\nA material that makes all light that pass through perpendicular to the panel. While compact, light passing through it will lose more energy. \n\nCurrent upgrades allows light to pass through with 60% of the incoming energy.": "标准化器\n一种使所有光线垂直于面板穿过的材料。 虽然紧凑，但穿过它的光会损失更多的能量。\n\n当前的升级允许光以60％的传入能量通过。",
    "Glass Prism\nA triangular glass shape. The different index of refraction of different wavelengths allow the prism to seperate red, green, and blue light.\n\nCurrent upgrades allows light to pass through with 80% of the incoming energy.": "玻璃棱镜\n一个三角形的玻璃形状。 不同波长的不同折射率使棱镜能够分离红，绿和蓝光。\n\n当前的升级允许光以80％的入射能量通过。",
    "Concave Lens\nA thin lens which bends light away from the center axis. Effective on all electromagnetic waves. Can be used with a convex lens to straighten out a beam of light.\n\nCurrent upgrades allows light to pass through with 90% of the incoming energy.": "凹透镜\n一种薄透镜，可将光线弯曲到远离中心轴的位置。 对所有电磁波均有效。 可以与凸透镜一起使用以使光束变直。\n\n当前的升级允许光以90％的入射能量通过。",
    "Blue Shifter\nA machine which will decreases the wavelength of incoming light. Must be powered by infrared light to function. It is unable to produce light with wavelengths shorter than ultraviolet light.\n\nAbsorbs IR light from either the top or bottom.\nTakes in light from the right.\n\nIt is 70% efficient.": "蓝移位器\n一个机器，可以减少入射光的波长。必须用红外光供电才能正常工作。它不能产生波长比紫外线短的光。从顶部或底部吸收红外光。从右边吸收光线。它的效率是70%。",
    "Unlocks concave and convex lenses": "解锁凹凸透镜",
    "Unlocks energizer": "解锁增能器",
    "Unlocks filters": "解锁过滤器",
    "Unlocks large mirrors": "解锁大镜子",
    "Unlocks small mirrors": "解锁小镜子",
    "Unlocks normalizers": "解锁规范化器",
    "Unlocks prisms": "解锁棱镜",
    "Unlocks shifter": "解锁移位器",
    "Power generated is now the highest achieved power generation. You can now redesign with peace of mind.": "现在，发电量是最高的发电量。 现在，您可以放心地进行重新设计。",
    "Increase mirror efficiency by 10%": "提高镜面效率10%",
    "Increase normalizer efficiency by 10%": "提高标准化器效率10%",
    "Increase prism efficiency by 10%": "将棱镜效率提高10%",
    "Increase shifter efficiency by 20%": "移位器效率增加20％",
    "Increases the number of light rays by 100 per second": "每秒增加100条光线",
    "Increases the number of light rays by 500 per second": "每秒增加500条光线",
    "Increase maximum of both convex and concave lenses by 1": "凸透镜和凹透镜的上限都增加1",
    "Increase maximum of both convex and concave lenses by 5": "凸透镜和凹透镜的上限都增加5",
    "Increase lens efficiency by 10%": "透镜效率增加10％",
    "Increase maximum prisms by 1": "棱镜上限增加1",
    "Increase maximum prisms by 3": "棱镜上限增加3",
    "Increase maximum shifters by 1": "偏移器上限增加1",
    "Increase maximum solar panels by 1": "太阳能板上限增加1",
    "Increase maximum small mirrors by 3": "小镜子上限增加3",
    "Increase maximum small mirrors by 6": "小镜子上限增加6",
    "Small Mirror\nA small reflective panel. Reflects rays out at an equal but opposite angle as of incoming lights. You know how mirrors work. Effective on all electromagnetic waves. \nIneffective against vampires.\n\nCurrent upgrades allows for the mirror to reflect light with 90% of the incoming energy.": "小镜子\n一个小反射板。 以与入射光相同但相反的角度反射光线。 你知道镜子是如何工作的。 对所有电磁波均有效。\n对吸血鬼无效。\n\n当前的升级允许反射镜以90％的入射能量反射光。",
    "\n\nRays per second: ": "\n\n每秒的光线: ",
    'Blue Shifter\nA machine which will decreases the wavelength of incoming light. Must be powered by infrared light to function. It is unable to produce light with wavelengths shorter than ultraviolet light.\n\nAbsorbs IR light from either the top or bottom.\nTakes in light from the right.\n\nIt is 90% efficient.': '蓝色移位器\n一个机器，将减少入射光的波长。必须用红外光供电才能正常工作。它不能产生波长比紫外线短的光。从顶部或底部吸收红外光。从右边吸收光线。它有90%的效率。',
    "Gamma Ray Cascader\nA complex machine that takes both infrared and ultraviolet light to convert xrays into gamma rays. \n\nAbsorbs UV light from the left.\nAbsorbs IR light from the right.\nTakes in x-rays from the bottom. \n\nIt is 50% efficient.": "伽玛射线级联的复杂机器，可以将红外线和紫外线转换成x射线。吸收左边的紫外线。从右边吸收红外光。从底部吸收x射线。它的效率是50%。",
    "Increase x-ray tube efficiency by 10%": "提高x射线管效率10%",
    "Normalizer\nA material that makes all light that pass through perpendicular to the panel. While compact, light passing through it will lose more energy. \n\nCurrent upgrades allows light to pass through with 70% of the incoming energy.": "标准化器\n一种使所有光线垂直于面板穿过的材料。 虽然紧凑，但穿过它的光会损失更多的能量。 \n\n当前的升级允许光以70％的传入能量通过。",
    "X-Ray Tube\nA specialized vacuum tube that converts ultraviolet light into x-rays. Be careful, x-rays are beyond the visible spectrum and require specialized film to see.\n\nIt is 70% efficient.": "X射线管\n专用的真空管，可将紫外线转换为X射线。 请注意，X射线超出了可见光谱，需要专门的胶片才能看到。\n\n它的效率是70％。",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需处理的后缀
var cnPostfix = {
    ":": "：",
    "：": "：",
    ": ": "： ",
    "： ": "： ",
    "/s)": "/s)",
    "/s": "/s",
    ")": ")",
    "%": "%",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": " ",
    "\n": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
    /^([\d\.]+)e(\d+)$/,
    /^([\d\.]+)$/,
];
var cnExcludePostfix = [
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
	[/^([\d\.]+)\/sec$/, '$1\/秒'],
    [/^Rays per second\: (.+)\nAverage infrared\: (.+)\nAverage red\: (.+)\nAverage green\: (.+)\nAverage blue\: (.+)\nAverage ultraviolet\: (.+)\nAverage xray\: (.+)\nAverage gamma\: (.+)$/, '每秒射线：$1 \n平均红外线：$2 \n平均红色：$3 \n平均绿色：$4 \n平均蓝色：$5 \n平均紫外线：$6 \n平均射线：$7 \n平均伽马：$8'],
    [/^Rays per second\: (\d+)$/, '每秒射线：$1'],
    [/^(.+)W \((.+)W$/, '$1W \($2W'],
    [/^(.+)W \((.+)W\/s\) \[(.+)W\/s]$/, '$1W \($2W\/秒\) \[$3W\/秒\]'],
    [/^\n\nOwned\: (.+)\nMaximum\: (.+)$/, '\n\n拥有：$1 \n最大数量：$2'],
    [/^Congratulations!\nYou managed to obtain an unbelievable amount of power!\nIt has been about (.+) minutes since you started.\nYou've reached the end of all current content. However, I may continue to develop more after the end of the jam.\nIn the meantime, click anywhere to return to the game.$/, '恭喜！\n您获得了令人难以置信的强大功能！\n自开始以来已经有$1分钟的时间。\n您已经达到所有当前内容的结尾。 但是，在卡纸结束后，我可能会继续开发更多游戏。\n同时，单击任意位置以返回游戏。'],
    [/^Total game ticks: (.+)\nMax power: (.+)\nTotal power: (.+)\nHighest power per second: (.+)\nCoolest person ever: You$/, '总游戏tick：$1 \n最大功率：$2 \n总功率：$3\n每秒最高功率：$4 \n有史以来最酷的人：您'],
    [/^(\d+) Royal points$/, '$1 皇家点数'],
    [/^\n\nCost\: (.+)$/, '成本：$1'],
    [/^Cost\: (.+)W$/, '成本：$1W'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);