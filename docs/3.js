const remSize = parseInt(getComputedStyle(document.documentElement).fontSize);
const tmpCanvas = document.createElement('canvas');
// 何でも繋がってしまう漢字は意図的に削除 (一二三四五六七八九十百千上下左右)
// const s1a = Array.from('一右雨円王音下火花貝学気九休玉金空月犬見五口校左三山子四糸字耳七車手十出女小上森人水正生青夕石赤千川先早草足村大男竹中虫町天田土二日入年白八百文木本名目立力林六');
const w1_ = Array.from('雨円王音火花貝学気休玉金空月犬見口校山子糸字耳車手出女小森人水正生青夕石赤川先早草足村大男竹中虫町天田土日入年白文木本名目立力林');
const w2_ = Array.from('引羽雲園遠何科夏家歌画回会海絵外角楽活間丸岩顔汽記帰弓牛魚京強教近兄形計元言原戸古午後語工公広交光考行高黄合谷国黒今才細作算止市矢姉思紙寺自時室社弱首秋週春書少場色食心新親図数西声星晴切雪船線前組走多太体台地池知茶昼長鳥朝直通弟店点電刀冬当東答頭同道読内南肉馬売買麦半番父風分聞米歩母方北毎妹万明鳴毛門夜野友用曜来里理話');
const w3_ = Array.from('悪安暗医委意育員院飲運泳駅央横屋温化荷界開階寒感漢館岸起期客究急級宮球去橋業曲局銀区苦具君係軽血決研県庫湖向幸港号根祭皿仕死使始指歯詩次事持式実写者主守取酒受州拾終習集住重宿所暑助昭消商章勝乗植申身神真深進世整昔全相送想息速族他打対待代第題炭短談着注柱丁帳調追定庭笛鉄転都度投豆島湯登等動童農波配倍箱畑発反坂板皮悲美鼻筆氷表秒病品負部服福物平返勉放味命面問役薬由油有遊予羊洋葉陽様落流旅両緑礼列練路和');
const w4_ = Array.from('愛案以衣位茨印英栄媛塩岡億加果貨課芽賀改械害街各覚潟完官管関観願岐希季旗器機議求泣給挙漁共協鏡競極熊訓軍郡群径景芸欠結建健験固功好香候康佐差菜最埼材崎昨札刷察参産散残氏司試児治滋辞鹿失借種周祝順初松笑唱焼照城縄臣信井成省清静席積折節説浅戦選然争倉巣束側続卒孫帯隊達単置仲沖兆低底的典伝徒努灯働特徳栃奈梨熱念敗梅博阪飯飛必票標不夫付府阜富副兵別辺変便包法望牧末満未民無約勇要養浴利陸良料量輪類令冷例連老労録');
const w5_ = Array.from('圧囲移因永営衛易益液演応往桜可仮価河過快解格確額刊幹慣眼紀基寄規喜技義逆久旧救居許境均禁句型経潔件険検限現減故個護効厚耕航鉱構興講告混査再災妻採際在財罪殺雑酸賛士支史志枝師資飼示似識質舎謝授修述術準序招証象賞条状常情織職制性政勢精製税責績接設絶祖素総造像増則測属率損貸態団断築貯張停提程適統堂銅導得毒独任燃能破犯判版比肥非費備評貧布婦武復複仏粉編弁保墓報豊防貿暴脈務夢迷綿輸余容略留領歴');
const w6_ = Array.from('胃異遺域宇映延沿恩我灰拡革閣割株干巻看簡危机揮貴疑吸供胸郷勤筋系敬警劇激穴券絹権憲源厳己呼誤后孝皇紅降鋼刻穀骨困砂座済裁策冊蚕至私姿視詞誌磁射捨尺若樹収宗就衆従縦縮熟純処署諸除承将傷障蒸針仁垂推寸盛聖誠舌宣専泉洗染銭善奏窓創装層操蔵臓存尊退宅担探誕段暖値宙忠著庁頂腸潮賃痛敵展討党糖届難乳認納脳派拝背肺俳班晩否批秘俵腹奮並陛閉片補暮宝訪亡忘棒枚幕密盟模訳郵優預幼欲翌乱卵覧裏律臨朗論');
// https://okjiten.jp/7-tyuugakuseikanji.html
// 漢検4級
const w7_ = Array.from('握扱依威偉為違緯維壱芋隠陰鋭影越援縁煙鉛汚押奥憶菓箇暇雅介壊戒皆較獲刈甘監汗歓勧乾鑑環含奇鬼祈輝幾儀戯詰脚却丘及朽拠巨距御驚凶恐響叫狭狂況仰駆屈掘繰傾恵迎撃肩堅遣兼軒圏剣玄誇鼓枯継互更荒抗攻稿香恒項豪込婚鎖歳彩載剤咲惨雌伺紫刺脂旨執芝煮斜釈寂狩朱趣需秀舟襲柔獣瞬巡旬盾紹召沼詳床称畳丈飾殖触浸震慎侵寝振薪陣尽尋吹是征姓井跡扇占鮮訴燥騒僧贈即俗耐替拓沢濁脱丹端嘆淡弾恥遅致蓄沖跳徴澄珍沈抵堤摘滴添殿途吐渡奴怒透唐桃盗塔到倒逃踏稲闘胴峠突鈍曇弐悩濃輩杯泊拍迫薄爆髪抜罰繁販搬範般盤被疲彼避尾微匹描浜敏怖膚浮腐敷普賦舞幅払噴柄壁捕舗峰抱砲肪坊忙冒傍帽凡盆漫慢妙眠矛霧娘茂網猛黙紋踊雄与誉腰溶躍謡翼雷頼絡欄離粒慮療隣涙隷麗齢暦劣烈恋露郎惑腕');
// 漢検3級
const w8_ = Array.from('哀慰詠悦閲炎宴欧殴乙卸穏架佳華嫁餓怪悔塊概慨該穫隔郭岳掛滑勘肝貫敢緩冠換喚企軌棄棋忌既岐騎犠欺菊吉喫虐虚脅峡凝緊斤愚偶遇啓鶏携掲刑憩契鯨賢倹幻雇顧弧孤悟娯甲孔控拘郊硬綱巧坑慌絞酵克獄魂紺恨墾催債削錯搾撮擦暫施祉諮侍慈軸湿疾赦邪殊寿潤遵徐如晶掌鐘焦衝昇匠譲錠嬢冗嘱辱審伸辛粋炊遂衰穂酔随髄瀬牲婿請隻惜斥籍摂潜繕措阻粗礎双桑葬掃遭憎促賊逮胎怠滞袋滝託卓択諾奪胆鍛壇稚畜窒駐抽鋳彫超聴陳鎮墜訂帝締哲斗塗陶凍痘匿篤豚尿粘婆排陪縛伐帆伴藩畔蛮泌卑碑姫漂苗赴符封伏覆墳紛癖募慕簿崩芳胞縫倣邦飽奉妨乏謀膨房某墨没翻魔埋膜又魅滅免幽憂誘擁揚揺抑裸濫吏隆了猟陵糧厘零霊励裂錬廉炉漏廊浪楼湾');
const i1_ = '小学校,日本人,小学生,小文字,大文字,中学生,中学校,大人気,大学生,日本一,一口大,五十音,日本円,赤文字,入学金,四天王'.split(',');
const i2_ = '北海道,日本語,社会人,地図上,外出先,高校生,中古車,外国人,東日本,西日本,先生方,十二分,中国語,顔文字,教科書,中心地,新生活,売上高,食市場,大多数,語学力,原作本,小売店,書店本,少人数,通学先,絵文字,日本海,青少年,頭文字,外国語,新番組,見学会,光回線,入門書,人気店,入会金,食生活,古書店,半歩上,地形図,新聞社,日本国,今大会,中国人,姉妹店,空室数,引用元,人間力,新会社,日米間,新年会,広東語,明細書,一時金,大人数,中高年,原生林,同友会,地図下,心理学,中心点,大草原,中古本,右半円,左半円,計算書,子会社,長電話,食肉店,公用語,計算上,生花店,水道水,東南海,母国語,電車男,通知書,分科会,思考力,黄金色,社会科,出来高,回答数,東海道,日記数,大百科,本大会,十六夜,多言語,当組合,人気作,中南米,里親犬,小休止,上下線,新工場,夏本番,多走行,文字色,新分野,生活上,地下室,日本画,何百万,回数分,引当金,行楽地,校長室,市長室,新聞紙'.split(',');
const i3_ = '飲食店,旅行記,東京都,福島県,自動車,日用品,自転車,出来事,暗号化,有名人,本発明,電話帳,千葉県,文字列,問題点,名古屋,図書館,使用上,新宿駅,長野県,用語集,正社員,本研究,三重県,委員会,運転手,発表会,正当化,主人公,研究所,自動化,事業所,青森県,真面目,新商品,写真集,全商品,日本酒,一体化,間取図,石川県,多様化,中心部,広島県,秋田県,大部分,代表作,中古品,実用化,古本屋,定食屋,活発化,山口県,使用感,山形県,勉強会,一本化,岩手県,都合上,理事会,高級感,注意点,出発点,商店主,理事長,番組表,車買取,大分県,商品化,小売業,医薬品,長期間,鳥取県,本記事,具体化,遊園地,部屋数,表面化,高知県,委員長,研究室,安心感,島根県,大集合,先進国,和食店,買取店,原動力,代理人,集客力,文字化,登山口,市役所,放送局,出発駅,地球上,新発売,短期間,画面上,旅日記,動物園,出発地,地球人,細分化,下半身,出身地,安定感,開放感,取引先,登山道,意見書,風物詩,交流会,注目作,集中力,発売元,旅行先,研究会,都市部,整体院,配送先,中央部,開会式,弱体化,研究員,主題歌,大流行,地下鉄,次回作,年度分,歯科医,入学式,配送員,多方面,発言数,思春期,会社員,部屋食,大問題,練習場,文化祭,路線図,商品数,電子化,電気屋,人事部,安定化,病医院,組合員,集合体,本事業,美少女,店写真,仕入先,世界一,鉄道駅,次世代,遊歩道,代理店,洋食屋,合言葉,注文数,山間部,立命館,運動会,北九州,決算書,運動場,住所地,古事記,日記帳,実用品,本作品,写真上,右写真,全世界,近代化,商品本,所有物,作曲家,高度化,合理化,新世界,乗用車,本調子,発想力,電気代,数十倍,秋葉原,事業主,家具屋,長期化,同級生,見放題,野生化,大注目,定番品,南西部,用品店,短時間,県教委,薬学生,勝負服,全客室,新学期,市教委,学習会,北西部,太平洋,角部屋,耳鼻科,取引所,文化人,感想文,漢方薬,同時期,親近感,相談室,集会場,世間話,軽作業,二次元,落語家,海岸線,前画面,転用元,生放送,配当金,区役所,全画面,東京駅,期待大,入園式,水族館,部活動,植物園,今月号,進学先,新書式,自走式,本発表,体重計,家庭力,水面下,一時代,記事数,行動力,万葉集,生命線,洋品店,事業部,名言集,発行元,新時代,花言葉,新登場,生息地,同意見,立体感,八重歯,表題作,発売国,文庫化,一安心,同業界,一身上,全記事,明文化,西遊記,書店員,大学院,県大会,正会員,医学会,工事業,一体感,前受金,太平記,自分流,生意気,写真屋,会員数,水平線,算定上,三千院,引出物,等身大,屋形船,化合物,大発生,病気犬,国指定,草野球,生命力,高速化,自由化,相手方,表形式,同期間,本部長,外注先,中医学,新入荷,客室間,教育力,事実上,発起人,定員数,同世代,一次会,問題化,道具屋,学園祭,高次元,工作員,体育館,相対化,実写化,食事会,起業家,風雲急,実体化,同時代,同等品,出身校,何百倍,部屋着'.split(',');
const i4_ = '不動産,不思議,管理人,埼玉県,駅周辺,利用上,茨城県,愛知県,時間帯,兵庫県,京都府,不具合,大阪府,英会話,体験談,未入力,単行本,手数料,目的地,歯周病,大満足,静岡県,大自然,観光客,福岡県,観光地,英数字,岐阜県,説明会,小児科,沖縄県,新潟県,特産品,新着順,卒業生,群馬県,配送料,栃木県,最終回,宮崎県,滋賀県,福井県,受験生,未登録,入札数,富山県,不自由,奈良県,参院選,宮城県,岡山県,特急便,不良品,今週末,不十分,共通点,香川県,調味料,料金表,特商法,新感覚,博物館,交差点,長崎県,熊本県,商店街,飛行機,急成長,成果物,大成功,卒業式,管理下,大浴場,不安定,小説家,原材料,不用品,勉強法,山梨県,愛媛県,佐賀県,宿予約,最上部,送信元,食料品,最上階,無関係,反対側,電器屋,電器店,健全化,文例集,低身長,交通量,最新号,主原料,一戸建,徳島県,説明書,魚料理,何種類,相関図,日本法,先着順,土産屋,不都合,大好物,住民票,石材店,日本初,自然界,植民地,未回答,自治体,特典品,差別化,民芸品,給湯器,関連語,主成分,世界観,標本画,通話料,印刷物,返信元,本会議,業界初,予約数,好立地,便利屋,返送料,配信元,助手席,名産品,卒園式,英語力,自分達,競争力,利用料,追加先,児童館,説明文,投票順,低金利,初当選,小料理,決勝戦,生産量,無農薬,読書量,無関心,試写会,記念品,配達員,通信社,料理店,入場料,温度差,協議会,人気順,使用法,二種類,固定化,集大成,使用料,最大化,重量物,未分類,分岐点,登録料,産業上,不景気,初体験,最新作,初期化,先週末,送受信,不登校,体験記,登録駅,住所順,具体例,健康上,最前線,走馬灯,古民家,求人票,不信感,駅徒歩,単身分,要望書,出典元,要出典,小馬鹿,関西発,未成年,大分類,使用量,要注意,生徒会,初対面,不必要,育児期,昨年末,園芸店,当協会,公民館,今月末,健康体,着色料,冷暗所,軽量化,予約上,送付先,焼肉屋,調理器,法令上,借入金,国交省,消化器,世界初,初参加,取消料,初登場,給料表,炭火焼,朝食付,不死鳥,共有化,予約宿,最高級,熱帯魚,高時給,静止画,本特集,海水浴,日本側,会議室,本登録,便利帳,日本軍,議事録,最大級,首里城,産直品,持分法,配水管,日付順,成人式,自信作,不自然,百貨店,児童書,南高梅,名前順,副会長,産業界,人物伝,阪神間,二極化,中心街,単語帳,利用分,主治医,改正案,送信先,助成金,同協会,大失敗,新選組,夏野菜,特別室,発言量,最下部,無意味,無香料,最終話,低料金,不本意,女友達,追求心,英単語,不明点,配信先,要注目,大阪駅,全重量,悪天候,高低差,参議院,最下位,回答順,改正法,不合理,三連休,料理人,機関紙,関心事,低学年,金利差,利用法,図案化,市議会,愛国心,季節感,見積書,周波数,法改正,運転席,同業種,会社法,連合隊,良回答,工芸茶,天然石,参考書,改札口,記入例,約半数,仲間達,梅雨空,電話機,集議院,文科省,重量感,地球博,地元産,生産地,足温器,未公開,魚貝類,初公開,配送便,無失点,一昨年,物香水,機械化,作品群,不要物,最小化,実験台,給湯室,関連本,寒冷地,投票数,有料化,博多駅,無生物,未記入,不定期,合法化,予約金,最重要,商品札,共用庭,沖縄人,副大臣,関係上,不整合,日産車,来週末,流通量,出願数,未完成,原風景,生徒達,初会合,低気温,相場観,見聞録,神無月,人流量,参照先,相続人,関連食,学習法,管理部,一苦労,登録順,機内食,京料理'.split(',');
const i5_ = '活性化,不適切,事務所,店情報,出版社,事務局,美容室,本規約,消費税,美容院,不可能,性質上,芸能人,居酒屋,編集部,非表示,広告主,最大限,保育園,個人差,未対応,未経験,最寄駅,大好評,税理士,政治家,厚労省,講演会,解説文,顔画像,不可欠,不利益,情報量,非公開,美術館,説得力,共益費,管理費,街情報,建築家,保証金,所在地,報告書,製造業,弁護士,証明書,全国版,運営局,画像下,投資家,最小限,価格帯,無意識,最適化,築年数,交通費,講談社,血液型,本格化,最新版,救急車,精神科,工務店,低価格,効率化,再放送,居心地,予備校,初回版,現時点,在学生,限定版,建設業,複合機,解決法,現在地,新幹線,歴史上,以下略,新製品,支配下,清潔感,保険料,再構築,非会員,再起動,講習会,新世紀,会員制,不快感,具現化,合計額,現行犯,英語版,高品質,関連職,記者団,保育所,参加費,建築物,不適当,生態画,適正化,車査定,出版物,過半数,研修会,予約制,書評数,美容師,対象店,日程表,明確化,高血圧,高機能,総選挙,犯罪歴,重過失,未設定,再入荷,宿情報,公務員,自衛隊,大容量,構成員,豆知識,栄養価,民営化,総務省,非対応,理容室,再発見,有意義,高画質,営業所,所得税,物件数,食品費,全物件,申告書,道州制,教職員,製品化,受講生,電子版,製造元,好印象,在庫数,受講料,入湯税,本製品,教育費,決定版,社労士,相続税,弁当屋,事故車,手術数,市民税,美術品,経産省,検察側,保育士,編集長,新機能,神経質,雑貨屋,営業職,母親似,父親似,日本版,留学生,仮想化,質問文,新条例,逆効果,代表格,画像付,婦人科,義務化,新技術,関東版,芸能界,組織化,評価点,美術書,現代人,増改築,再構成,留意点,留守番,出張先,表示上,光熱費,生活費,全表示,現実味,本講義,無効化,混血児,複雑化,年会費,大統領,保険金,評価書,総資産,投資法,日本史,大正解,駅情報,角主張,標準化,会計士,造園業,高評価,性病科,技術上,会員版,作務衣,男女比,調査隊,製品版,再配信,正義感,経営上,貸倉庫,不正確,注意報,制度化,運輸業,再編集,町民税,非通知,刊行物,旅情報,付属品,非営利,不明確,肥大化,在校生,責任感,本講演,全体像,編集室,今現在,声表示,情報室,婦人服,常識化,個体差,高気圧,文化財,主業務,平和賞,武士道,資本金,増減額,大絶賛,全採点,居場所,大賛成,半導体,必殺技,似顔絵,通常版,面接官,再評価,定額法,体験版,三国志,神格化,正常化,表示順,志望校,再交付,境界線,保証人,建造物,不合格,全機能,登録制,路線価,小麦粉,個数分,助産師,個人間,情報屋,高断熱,性教育,現代風,告別式,博士号,非売品,本報告,法人税,技術力,表示校,保健所,運営元,再配布,修理屋,常態化,雑記帳,富士見,広告費,教材費,栄養素,技能工,世界史,現実化,転職先,経由地,四六判,再発行,正職員,経験談,理美容,光接続,価格順,配布店,全件数,測定器,弁護側,不織布,指圧師,特別賞,本調査,最低限,構築物,初任給,弁当箱,資料集,日刊紙,絶好調,限定数,無修正,富士通,生情報,総人口,伝統芸,取引額,人件費,特性上,仕事術,生出演,想像力,事務職,住民税,現金化,精神面,評価額,得意技,過去問,罪悪感,日本製,北方史,防衛省,委任状,授業料,招待状,安定型,光情報,保険証,情報化,高性能,指圧業,管理職,感謝状,家政婦,重厚感,同製品,芸術家,適時打,読解力,夏限定,低気圧,定額制,日常化,節約術,保険屋,小型化,素材集,限度額,技術面,大型化,質問箱,現行法,関西版,出資金,本資料,職務上,資料館,変動額,正規品,保養所,殺人罪,歴史学,美人妻,航空機,三省堂,未経過,未入居,買取額,大特価,再登場,栄養士,保健室,文学賞,消費財,物件量,投資術,無造作,高音質,古美術,保健師,最高額,構造順,応相談,類義語,質問集,最新刊,非上場,原判決,再照準,同条件,限定品,未解決,化学賞,修理代,制作料,旧条例,現地発,絶対数,再質問,学資金,反比例,非日常,大感謝,情報元,研究費,特別職,経営学,完全版,再生産,総動員,当社比,会員証,投資額,小型版,消費量,無限大,全神経,査定額,解説書,指導力,短編集,計測器,再表示,表現力,製造所,酸化物,再指定,自家製,決断力,大紀元,素材屋,低学歴,前日比,保安林,新規則,規制法,世紀末,再出発,美容液,再開発'.split(',');
const i6_ = '著作権,看護師,専門家,著作物,従量制,冷蔵庫,最安値,勤務地,郵便局,宅配便,民主党,展覧会,展示会,価値観,航空券,専門店,映画化,再認識,再確認,領収書,私自身,従業員,存在感,会員権,専門医,時刻表,温泉宿,重要視,子供達,映画館,住宅街,最優先,学校裏,専門書,筋肉痛,展望台,補助金,神経痛,問題視,現段階,転居届,承認制,貴金属,整骨院,裁判所,情報誌,看護婦,危機感,子供服,小冊子,官公庁,温泉地,高収入,接骨院,関節痛,特派員,遺伝子,宅急便,処方薬,自民党,主導権,住宅地,温暖化,最盛期,深刻化,私個人,車通勤,略系図,代名詞,所得割,背景色,拡大図,議決権,演奏会,検察庁,一段落,純資産,団結権,提供先,所有権,税務署,一覧表,内視鏡,大規模,立候補,純米酒,情報源,映像化,乳幼児,一筋縄,和訳付,貸衣装,評論家,気象庁,世界樹,非常勤,経験値,簡略化,出場権,展示場,収益金,異世界,血糖値,公明党,法律案,諸事情,提供元,商品券,同一視,成約済,月刊誌,訪問着,加盟店,衆院選,少数派,社会派,使用権,疑問視,本講座,劇場版,学習机,本論文,大株主,初優勝,専門職,準優勝,就活生,再検討,写真展,体系化,諸外国,洗面所,勤務先,忘年会,警視庁,高気密,就活本,専門業,数値化,並以上,現在値,実現論,地域順,背番号,単純化,経済学,純利益,住宅版,社保庁,法律上,基準値,誕生花,納期限,危険物,特許権,解決策,社民党,温泉街,子供心,郵便業,簡素化,天皇賞,拡張子,日本株,刻一刻,可視化,諸問題,最高潮,市民権,著名人,授乳期,宇宙人,宣伝費,遺言書,有力視,同窓会,視覚化,対処法,再就職,学会誌,殺処分,使用済,保存料,平均値,整理券,重軽傷,就職先,参政権,疑問点,資本論,未確認,私物化,単独値,座談会,探査機,選挙権,領有権,看護士,商標権,豊胸術,創造力,樹林帯,全否定,外国株,店一覧,路地裏,白内障,内閣府,深呼吸,縦半分,警察庁,裁判員,確実視,指揮下,日系人,異業種,食事処,入力値,招待券,延長上,作品展,裏情報,割引券,心臓病,新装版,勤務医,権利金,訪問記,諸経費,副収入,勤務科,最高値,大衆食,指揮官,一寸先,著作本,行政庁,胃腸科,宗教上,営業権,経済面,臨場感,女子供,延喜式,展示室,探検隊,呼吸器,納骨堂,認定証,自然派,売約済,時系列,異次元,最上段,異星人,模式図,中国株,時代劇,最大値,誤発注,資金源,大興奮,片頭痛,結果論,桜並木,地域版,縦位置,大混乱,警察署,映画版,未実装,異文化,急拡大,参拝客,降水量,入退会,地域語,駅一覧,緑内障,全株式,視覚障,期末値,演奏家,将来像,利用層,県庁舎,客観視,米百俵,身体障'.split(',');
const i7_ = '大丈夫,薬剤師,大歓迎,連絡先,記入欄,結婚式,違和感,首都圏,皮膚科,紹介状,治療院,攻略法,大活躍,北朝鮮,無添加,販売店,透明感,老朽化,悪影響,備考欄,皆様方,大盛況,治療法,影響力,必需品,紹介文,実店舗,高齢化,送料込,投稿数,市販薬,義援金,状況下,環境下,是非見,五十肩,精一杯,一般化,玄関口,敬称略,準拠法,貸店舗,大爆笑,到着地,一軒宿,連絡帳,初回盤,巨大化,信頼感,獣医師,治療費,介護職,舞台裏,離乳食,添加物,情報網,宿詳細,漫画家,吹奏楽,魚介類,含有量,攻撃力,腸年齢,更新順,朝鮮人,最先端,並大抵,洋菓子,歌謡曲,入力欄,関東圏,医療費,更新料,比較表,生中継,理髪店,優秀賞,好奇心,晩御飯,一般論,脱衣所,関西圏,販売物,起訴状,壁一面,給水塔,鑑賞術,床面積,近隣駅,添乗員,被告人,証拠金,贈答品,和菓子,属性欄,面倒見,被害届,大打撃,影響下,環境省,巨人軍,申込書,大地震,投稿順,途上国,一般職,宿泊業,警戒心,本拠地,維持費,取扱店,通信欄,搬送先,要支援,派遣先,沈静化,手間暇,販売元,通常盤,扇風機,広告欄,到着駅,大先輩,宿泊先,腕時計,抵当権,通販法,店舗数,比較順,旬食店,慢性化,岩盤浴,起爆剤,何箇所,年齢層,薄緑色,全趣旨,太鼓判,投稿文,寄稿家,紫外線,詳細図,即戦力,新着欄,英語圏,反抗期,紹介先,禁煙席,最高峰,介護士,陰日向,格闘技,再転載,火傷跡,横浜駅,作家陣,被災地,立替金,表舞台,応援隊,慎重派,抵抗力,治療薬,豆腐屋,奥座敷,最南端,音響屋,宿泊地,不透明,風来坊,脳年齢,一箇所,破壊力,乾電池,鑑賞券,大図鑑,弐代目,応援団,男性陣,引越屋,変更点,浜名湖,育毛剤,甘味料,未連絡,四季彩,微調整,講師陣,売却済,要望欄,非接触,奮闘記,急浮上,報道陣,最北端,振込先,柔道界,国内盤,珍百景,不況下,普段着,変更元,宿泊記,大冒険,大爆発,再投稿,未投稿,優越感,震源地'.split(',');
const i8_ = '駐車場,卸価格,知恵袋,幼稚園,携帯版,文房具,通信簿,糖尿病,卸問屋,甲信越,大企業,掲載元,寿司屋,申請書,超国家,未開封,終止符,超高速,超特価,施工例,卸売業,請願権,本籍地,委託先,再選択,応募票,請求書,誤変換,緊張感,繁華街,慰安婦,家族葬,大掃除,卸会社,喫茶店,大募集,再逮捕,掃除機,宴会場,大魔王,甲子園,受審人,契約書,髄膜炎,恵比寿,実施例,高待遇,急上昇,型肝炎,吉野家,可哀想,紙書籍,分譲地,葬儀場,円滑化,提携先,転換期,排出量,控訴人,改訂版,葬儀屋,書籍版,超高層,取締役,緊張型,座標軸,新基軸,慰謝料,免許証,企画案,審査員,雑居房,卸単価,既発売,十字架,撮影会,南房総,事件簿,補助錠,大怪我,本実施,概略版,火葬場,締約国,魔術師,仏壇店,硬直化,三冠王,再掲載,無伴奏,回顧録,超格安,超厚底,娯楽業,企画展,逮捕状,託児所,増粘剤,審議会,処刑人,卸販売,双方向,罰金刑,盗聴器,粗利益,超簡単,請求人,売掛金,裸撮影,摂取量,閲覧数,当施設,囲炉裏,超人気,応募券,寿司店,日米欧,家計簿,抽象化,貧乏人,未掲載,卸資産,超洗脳,既往歴,炎天下,休憩室,保湿力,全書籍,伏流水,地縛霊,大転換,炊飯器,間伐材,関節炎,概算値,葬祭業'.split(',');
const i9_ = '雰囲気,診療所,学習塾,履歴書,再検索,口蹄疫,倶楽部,不妊症,認知症,洗濯機,偏差値,選択肢,花粉症,懇親会,化粧品,披露宴,感染症,富裕層,蕎麦屋,車椅子,肖像権,進学塾,免疫力,敏感肌,子宮頸,塾講師,検索窓,顕在化,名探偵,剰余金,症候群,醍醐味,垣間見,超充実,友達宛,不愉快,札幌店,那覇店,熱中症,洗濯物,表彰式,廃棄物,分析力,韓国人,検索語,依存症,乾燥肌,購入数,諸葛亮,診療科,白牡丹,弊社宛,肛門科,多汗症,解説頁,加齢臭,管弦楽,不明瞭,懇談会,韓国語,大傑作,脳梗塞,検索量,鍼灸院,擬人化,不機嫌,核兵器,伊藤園,釣行記,紳士服,嫌悪感,大相撲,渋谷駅,哺乳類,廃線跡,顆粒状,三毛猫,韓国戦,瑠璃色,膠原病,清涼感,初挑戦,金融庁,札幌駅,化粧水,北近畿,核実験,大雑把,未購入,鍵開錠,歌舞伎,桶狭間,稽古場,亜麻色,形骸化,購読料,風呂屋,探偵社,消耗品,膀胱炎,腎不全,核武装,雛人形,奨学金,何時頃,天婦羅,子守唄,診察室,僕自身,狭心症,片栗粉,嫌韓流,風呂敷,婚姻届,芋焼酎,琵琶湖,姑獲鳥,履修上,諸症状,坪単価,消臭剤,麻酔科,堪忍袋,吾妻鏡,偏頭痛,管轄下,受験塾,透明肌,検索数,全銘柄,三銃士,江戸期,広告枠,韓国兵,併設型,赤兎馬,学生寮,丁寧語,向日葵,釣具店,大風呂,渋谷店,麦焼酎,芯研器,発祥地,不謹慎,検索法,大合併,特捜部,悪循環,診断書,暗黒竜,閑古鳥,蛍光灯,骨董品,全検索,昭和臭,日中韓'.split('');
const i1 = i1_;
const i2 = i2_.concat(i1_);
const i3 = i3_.concat(i2_);
const i4 = i4_.concat(i3_);
const i5 = i5_.concat(i4_);
const i6 = i6_.concat(i5_);
const i7 = i7_.concat(i6_);
const i8 = i8_.concat(i7_);
const i9 = i9_.concat(i8_);
const w1 = w1_;
const w2 = w2_.concat(w1);
const w3 = w3_.concat(w2);
const w4 = w4_.concat(w3);
const w5 = w5_.concat(w4);
const w6 = w6_.concat(w5);
const w7 = w7_.concat(w6);
const w8 = w8_.concat(w7);
const idiomsList = [i1, i1, i2, i3, i4, i5, i6, i7, i8, i9];
const wordsList  = [w1, w1, w2, w3, w4, w5, w6, w7, w8, w8];
let size = 10;
let meiro = new Array(12);
let score = 0;
let counter = 0;
let processed;
let idioms = i4;
let words  = w4;
let level = 4;

function loadConfig() {
  if (localStorage.getItem('darkMode') == 1) {
    document.documentElement.dataset.theme = 'dark';
  }
}
loadConfig();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    [array[i], array[rand]] = [array[rand], array[i]]
  }
  return array;
}

function calcReply() {
  var reply = new Array(size * size);
  var trs = document.getElementById('meiro').children;
  for (var x=0; x<size; x++) {
    var tds = trs[x].children;
    for (var y=0; y<size; y++) {
      var selected = tds[y].classList.contains('table-primary');
      var hinted = tds[y].classList.contains('table-secondary');
      var pos = meiro[x][y];
      if (pos > 0 && (selected || hinted)) {
        reply[pos-1] = tds[y].innerText;
      }
    }
  }
  return reply;
}

function findMeiroIndex(n) {
  for (var x=0; x<size; x++) {
    for (var y=0; y<size; y++) {
      if (meiro[x][y] == n) {
        return x * size + y;
      }
    }
  }
  return -1;
}

function prependIdiomLink(idiom, correct) {
  var a = document.createElement('a');
  a.innerText = idiom;
  a.href = 'https://www.google.com/search?q=' + idiom + 'とは';
  a.target = '_blank';
  a.rel = 'noopener noreferer';
  if (correct) {
    a.className = 'btn btn-light m-1';
  } else {
    a.className = 'btn btn-secondary m-1';
  }
  solvedPanel.prepend(a);
}

function showSolved(reply, hinted) {
  var solvedPanel = document.getElementById('solvedPanel');
  var trs = document.getElementById('meiro').children;
  var j = 0;  var k = 0;
  for (var i=0; i<counter; i++) {
    var idiom = idioms[j];
    if (!processed[i]) {
      if (reply[i] == idiom[k]) {
        if (k == idiom.length - 1) {
          prependIdiomLink(idiom, true);
          score += idiom.length;
          document.getElementById('score').innerText = score;
        }
        processed[i] = true;
      } else {
        prependIdiomLink(idiom, false);
        var pos = i - k;
        for (var l = pos; l < pos + idiom.length; l++) {
          processed[l] = true;
          var idx = findMeiroIndex(l+1);
          var td = trs[Math.floor(idx / size)].children[idx % size];
          td.className = '';
          td.classList.add('table-secondary');
        }
        if (hinted) {
          break;
        }
      }
    }
    if (k == idiom.length - 1) {
      j += 1;  k = 0;
    } else {
      k += 1;
    }
  }
}

function showHint(reply) {
  var reply = calcReply();
  showSolved(reply, true);
}

function showAnswer() {
  var reply = calcReply();
  showSolved(reply, false);
  var trs = document.getElementById('meiro').children;
  for (var x=0; x<size; x++) {
    var tds = trs[x].children;
    for (var y=0; y<size; y++) {
      if (meiro[x][y] > 0) {
        tds[y].className = '';
        tds[y].classList.add('table-danger');
      }
    }
  }
  var startButton = document.getElementById('startButton');
  startButton.classList.remove('d-none');
  startButton.innerText = 'スタート';
  var answerButton = document.getElementById('answerButton');
  answerButton.classList.add('d-none');
}

function getNeighborText(trs, x, y, direction) {
  var text = trs[x].children[y].innerText;
  if (direction == 1) {
    if (meiro[x-1][y] != 0) {
      text += trs[x-1].children[y].innerText;
    }
  } else if (direction == 2) {
    if (meiro[x+1][y] != 0) {
      text += trs[x+1].children[y].innerText;
    }
  } else if (direction == 3) {
    if (meiro[x][y-1] != 0) {
      text += trs[x].children[y-1].innerText;
    }
  } else {
    if (meiro[x][y+1] != 0) {
      text += trs[x].children[y+1].innerText;
    }
  }
  return text;
}

function setNeighborText(trs, x, y, direction, text, isAnswer) {
  if (!isAnswer) {
    trs[x].children[y].innerText = text[0];
  }
  if (direction == 1) {
    trs[x-1].children[y].innerText = text[1];
  } else if (direction == 2) {
    trs[x+1].children[y].innerText = text[1];
  } else if (direction == 3) {
    trs[x].children[y-1].innerText = text[1];
  } else {
    trs[x].children[y+1].innerText = text[1];
  }
}

function generateRandomText(text, isAnswer) {
  if (isAnswer) {
    var first = text[0];
    for (var i=0; i<5; i++) {  // どうしても熟語ができてしまうケースがあるため回数打ち切り
      text = first + words[getRandomInt(0, words.length)];
      if (!includeIdiom(text)) { return text; }
    }
  } else {
    for (var i=0; i<5; i++) {  // どうしても熟語ができてしまうケースがあるため回数打ち切り
      for (var j=0; j<2; j++) {
        text[j] = words[getRandomInt(0, words.length)];
      }
      if (!includeIdiom(text)) { return text; }
    }
  }
  return text;
}

function includeIdiom(text) {
  if (idioms.includes(text.slice(0, 2))) {
    return true;
  } else {
    return false;
  }
}

function strictNeighbor(trs, x, y, direction, isAnswer) {
  var text = getNeighborText(trs, x, y, direction);
  if (text.length == 2) {  // 解答ノードを含まない時
    text = generateRandomText(text, isAnswer);
    setNeighborText(trs, x, y, direction, text, isAnswer);
  }
}

function strictSolution() {
  var trs = document.getElementById('meiro').children;
  for (var x=0; x<size; x++) {
    for (var y=0; y<size; y++) {
      if (meiro[x][y] == 0) {
        // 解答ノード以外は隣接ニ文字だけ見て熟語ができないようにする
        if (0 <= x-1) {
          strictNeighbor(trs, x, y, 1, false);
        }
        if (x+1 < size) {
          strictNeighbor(trs, x, y, 2, false);
        }
        if (0 <= y-1) {
          strictNeighbor(trs, x, y, 3, false);
        }
        if (y+1 < size) {
          strictNeighbor(trs, x, y, 4, false);
        }
      } else {
        // 解答ノードは別解ができないようにする
        var routes = getNeighborRoutes(x, y);
        for (var j=0; j<routes.length; j++) {
          strictNeighbor(trs, x, y, routes[j][2], true);
        }
      }
    }
  }
}

function startGame() {
  while (solvedPanel.firstChild) { solvedPanel.removeChild(solvedPanel.firstChild); }
  generateGame();
  strictSolution();
  var startButton = document.getElementById('startButton');
  startButton.classList.add('d-none');
  startButton.innerText = 'やり直し';
  var answerButton = document.getElementById('answerButton');
  answerButton.classList.remove('d-none');
}

function isPassableRoute(x, y, routes) {
  if (routes.length == 4) {
    return true;
  } else if (routes.length == 3) {
    if (x == 0 || x == size -1 || y == 0 || y == size -1) {
      return true;
    }
  }
  return false;
}

function isPassableNeighbor(x, y, routes) {
  if (routes.length >= 3) {
    return true;
  } else if (routes.length == 2) {
    if (x == 0 || x == size -1 || y == 0 || y == size -1) {
      return true;
    }
  }
  return false;
}

function getRoute(x, y, direction, n) {
  var directions = shuffle([1, 2, 3, 4]);
  var tmpRoutes = getNeighborRoutes(x, y);
  if (!isPassableNeighbor(x, y, tmpRoutes)) {
    return false;
  }

  for (var d=0; d<directions.length; d++) {
    if (directions[d] == 1 && 0 <= x-n && direction != 2) {
      var passable = true;
      for (var i=1; i<=n; i++) {
        tmpRoutes = getNeighborRoutes(x-i, y);
        if (!isPassableRoute(x-i, y, tmpRoutes)) {
          passable = false;
          break;
        }
      }
      if (passable) { return [x-1, y, 1]; }
    }
    if (directions[d] == 2 && x+n < size && direction != 1) {
      var passable = true;
      for (var i=1; i<=n; i++) {
        tmpRoutes = getNeighborRoutes(x+i, y);
        if (!isPassableRoute(x+i, y, tmpRoutes)) {
          passable = false;
          break;
        }
      }
      if (passable) { return [x+1, y, 2]; }
    }
    if (directions[d] == 3 && 0 <= y-n && direction != 4) {
      var passable = true;
      for (var i=1; i<=n; i++) {
        tmpRoutes = getNeighborRoutes(x, y-i);
        if (!isPassableRoute(x, y-i, tmpRoutes)) {
          passable = false;
          break;
        }
      }
      if (passable) { return [x, y-1, 3]; }
    }
    if (directions[d] == 4 && y+n < size && direction != 3) {
      var passable = true;
      for (var i=1; i<=n; i++) {
        tmpRoutes = getNeighborRoutes(x, y+i);
        if (!isPassableRoute(x, y+i, tmpRoutes)) {
          passable = false;
          break;
        }
      }
      if (passable) { return [x, y+1, 4]; }
    }
  }
  return false;
}

function getNeighborRoutes(x, y) {
  var routes = [];
  if (0 <= x-1 && meiro[x-1][y] == 0) {
    routes.push([x-1, y, 1]);
  }
  if (x+1 < size && meiro[x+1][y] == 0) {
    routes.push([x+1, y, 2]);
  }
  if (0 <= y-1 && meiro[x][y-1] == 0) {
    routes.push([x, y-1, 3]);
  }
  if (y+1 < size && meiro[x][y+1] == 0) {
    routes.push([x, y+1, 4]);
  }
  return routes;
}

function paint(x, y, direction, n) {
  if (direction == 1) {
    for (var i=0; i<n; i++) {
      counter += 1;
      meiro[x-i][y] = counter;
    }
    return [x-n+1, y];
  } else if (direction == 2) {
    for (var i=0; i<n; i++) {
      counter += 1;
      meiro[x+i][y] = counter;
    }
    return [x+n-1, y];
  } else if (direction == 3) {
    for (var i=0; i<n; i++) {
      counter += 1;
      meiro[x][y-i] = counter;
    }
    return [x, y-n+1];
  } else {
    for (var i=0; i<n; i++) {
      counter += 1;
      meiro[x][y+i] = counter;
    }
    return [x, y+n-1];
  }
}

function p() {
  var str = '';
  for (var i=0; i<size; i++) {
    for (var j=0; j<size; j++) {
      str += meiro[i][j];
    }
    str += '\n';
  }
  console.log(str);
}

function generateGame() {
  // 開始地点を選び隣接しないように熟語を埋めていく
  idioms = shuffle(idioms);
  var generating = true;
  while (generating) {
    var x1 = 0;
    var y1 = getRandomInt(1, size-1);
    var painting = true;
    counter = 0;
    for (var x=0; x<size; x++) {
      meiro[x] = new Array(size);
      for (var y=0; y<size; y++) {
        meiro[x][y] = 0;
      }
    }
    var route = getRoute(x1, y1, -1, idioms[0].length);
    var xy = paint(x1, y1, route[2], idioms[0].length);
    x1 = xy[0];
    y1 = xy[1];
    var i = 1;
    while (painting) {
      var firsts = shuffle(getNeighborRoutes(x1, y1));
      if (firsts.length == 0) {
        painting = false;
      } else {
        var noRoute = true;
        for (var j=0; j<firsts.length; j++) {
          route = getRoute(firsts[j][0], firsts[j][1], firsts[j][2], idioms[i].length - 1);
          if (route) {
            noRoute = false;
            paint(firsts[j][0], firsts[j][1], firsts[j][2], 1);
            xy = paint(route[0], route[1], route[2], idioms[i].length - 1);
            x1 = xy[0];
            y1 = xy[1];
            if (x1 == 0 || x1 == size-1 || y1==0 || y1 == size-1) {
              painting = false;
              if (counter > 20) {  // 良い迷路になっている
                generating = false;
                processed = new Array(counter);  // 回答リストのキャッシュを生成
              }
            }
            i += 1;
            break;
          }
        }
        if (noRoute) { painting = false; }
      }
    }
  }
  var meiroNode = document.getElementById('meiro');
  while(meiroNode.firstChild) { meiroNode.removeChild(meiroNode.firstChild); }
  for (var x=0; x<size; x++) {
    var tr = document.createElement('tr');
    meiroNode.appendChild(tr);
    for (var y=0; y<size; y++) {
      var td = document.createElement('td');
      td.innerText = words[getRandomInt(0, words.length)];
      tr.appendChild(td);
      td.onclick = function() {
        this.classList.toggle('table-primary');
      }
    }
  }
  var trs = meiroNode.children;
  var j = 0;  var k = 0;
  for (var i=1; i<=counter; i++) {
    var idx = findMeiroIndex(i);
    var idiom = idioms[j][k];
    var td = trs[Math.floor(idx / size)].children[idx % size];
    td.innerText = idiom;
    if (i == 1) {
      td.classList.add('table-secondary');
    }
    if (k == idioms[j].length - 1) {
      j += 1;  k = 0;
    } else {
      k += 1;
    }
  }
}

function resizeFontSize(node) {
  // https://stackoverflow.com/questions/118241/
  function getTextWidth(text, font) {
      // re-use canvas object for better performance
      // var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
      var context = tmpCanvas.getContext("2d");
      context.font = font;
      var metrics = context.measureText(text);
      return metrics.width;
  }
  function getTextRect(text, fontSize, font, lineHeight) {
    var lines = text.split('\n');
    var maxWidth = 0;
    var fontConfig = fontSize + 'px ' + font;
    for (var i=0; i<lines.length; i++) {
      var width = getTextWidth(lines[i], fontConfig);
      if (maxWidth < width) {
        maxWidth = width;
      }
    }
    return [maxWidth, fontSize * lines.length * lineHeight];
  }
  function getNodeRect() {
    var width = document.getElementById('container').clientWidth;
    var headerHeight = document.getElementById('header').clientHeight;
    var startButtonHeight = document.getElementById('startButton').clientHeight;
    var height = document.documentElement.clientHeight - headerHeight - startButtonHeight;
    return [width, height];
  }
  // function getPaddingRect(style) {
  //   var width = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
  //   var height = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
  //   return [width, height];
  // }
  var style = getComputedStyle(node);
  var font = style.fontFamily;
  var fontSize = 16;  // parseFloat(style.fontSize);
  var lineHeight = 1.1;  // parseFloat(style.lineHeight) / fontSize;
  var nodeRect = getNodeRect();
  var textRect = getTextRect('禿', fontSize, font, lineHeight);
  var paddingRect = [remSize * 2 + 21, remSize * 1.5 + 6]; // getPaddingRect(style);

  // https://stackoverflow.com/questions/46653569/
  // Safariで正確な算出ができないので誤差ぶんだけ縮小化 (10%)
  var rowFontSize = fontSize * (nodeRect[0] - paddingRect[0]) / 12 / textRect[0] * 0.90;
  var colFontSize = fontSize * (nodeRect[1] - paddingRect[1]) / 12 / textRect[1] * 0.90;
  if (colFontSize < rowFontSize) {
    node.style.fontSize = colFontSize + 'px';
  } else {
    node.style.fontSize = rowFontSize + 'px';
  }
}

function toggleDarkMode() {
  if (localStorage.getItem('darkMode') == 1) {
    localStorage.setItem('darkMode', 0);
    delete document.documentElement.dataset.theme;
  } else {
    localStorage.setItem('darkMode', 1);
    document.documentElement.dataset.theme = 'dark';
  }
}

var timerText = document.getElementById('meiro');
resizeFontSize(timerText);
window.addEventListener('resize', function() {
  resizeFontSize(timerText);
});
generateGame();
strictSolution();
while (solvedPanel.firstChild) { solvedPanel.removeChild(solvedPanel.firstChild); }
showAnswer();

document.getElementById('levelOption').addEventListener('change', function() {
  idioms = idiomsList[this.selectedIndex];
  words = wordsList[this.selectedIndex];
  startGame();
});
document.getElementById('courseOption').addEventListener('change', function() {
  location.href = this.options[this.selectedIndex].value;
});

