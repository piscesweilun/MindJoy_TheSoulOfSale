import { ArtPiece } from './types';
import legacyNotTaxesImg from './src/assets/images/legacy-not-taxes.png';
import herosPlanBImg from './src/assets/images/heros-plan-b.png';
import agingWithDignityImg from './src/assets/images/aging-with-dignity.png';
import paycheckForLifeImg from './src/assets/images/paycheck-for-life.png';
import wingsForFutureImg from './src/assets/images/wings-for-future.png';
import powerOfChoiceImg from './src/assets/images/power-of-choice.png';
import powerOfGratitudeImg from './src/assets/images/power-of-gratitude.png';
import cut1Img from './src/assets/images/cut-1.jpg';
import cut2Img from './src/assets/images/cut-2.jpg';
import cut3Img from './src/assets/images/cut-3.jpg';

const DEFAULT_KEY_CUTS = [
    cut1Img,
    cut2Img,
    cut3Img
];

export const ART_PIECES: ArtPiece[] = [
    {
        id: '1',
        title: '把愛留下，不把稅留下',
        englishTitle: 'Legacy, Not Taxes',
        description: '65-75高資產客戶，對接遺產稅規劃',
        price: '1,498 P',
        image: legacyNotTaxesImg,
        videoId: 'k3KzHAXdv4o',
        narrativePhilosophy: '針對高資產客戶最現實的「遺產稅流動性」問題。我們不談空泛的傳承，而是直擊核心：如何避免家人在面臨鉅額稅金時，被迫低價折讓資產或變賣家產。保險在這裡是為了「預留稅源」，確保資產的完整性。',
        scriptPreview: '「奮鬥一輩子留下的江山，不該讓國稅局成為您的第一順位繼承人。」',
        usageScenario: '適合在討論資產總額、試算遺產稅負擔，或客戶擔心不動產比例過高時使用。',
        keyCuts: DEFAULT_KEY_CUTS
    },
    {
        id: '2',
        title: '英雄的 B 計畫 - 給最愛的人 40 倍的守護',
        englishTitle: 'The Hero’s Plan B',
        description: '50-65企業主/高階人士，對接美元高槓桿壽險',
        price: '998 P',
        image: herosPlanBImg,
        narrativePhilosophy: '針對事業有成的家庭領袖。這類客戶以身為「王國造就者」為傲。這支影片利用 40 倍的高槓桿保障，激發客戶的英雄特質與遠見——真正的強者，是在即使自己不在場的情況下，依然能確保家庭與事業的繁榮。',
        scriptPreview: '「真正的英雄，是即便在看不見的地方，守護依然無所不在。」',
        usageScenario: '鎖定高資產、具有家長權威感的男性企業主。在討論家庭責任、資產保全或高額美元配置時播放。',
        keyCuts: DEFAULT_KEY_CUTS
    },
    {
        id: '3',
        title: '預約不求人的尊嚴 - 一份不擔心沒人照顧的底氣',
        englishTitle: 'Aging with Dignity',
        description: '50-65歲三明治世代，對接長照與失能險',
        price: '598 P',
        image: agingWithDignityImg,
        narrativePhilosophy: '專為「不婚、不生」或「不想拖累下一代」的群體設計。核心在於：自備長照資源，確保老後的醫療品質與個人尊嚴。這不是在推銷恐懼，而是在推廣一種「不求人」的自由，確保無論環境如何變遷，自己始終是自己的靠山。',
        scriptPreview: '「老後的體面，靠的不是晚輩的孝心，而是您現在為自己築起的防護牆。」',
        usageScenario: '適合在討論高齡化社會、獨身退休規劃或當客戶表達「不希望孩子為難」的念頭時使用。',
        keyCuts: DEFAULT_KEY_CUTS
    },
    {
        id: '4',
        title: '打造一份不謝幕的終身薪水',
        englishTitle: 'A Paycheck for Life',
        description: '55-65歲屆退族，對接退休年金險',
        price: '598 P',
        image: paycheckForLifeImg,
        narrativePhilosophy: '退休不該是工作生涯的終點，而是「生活主導權」的奪回。我們重新定義退休後的現金流為「自由的入場券」。',
        scriptPreview: '「退休不是工作的結束，而是拿回人生主導權的開始。」',
        usageScenario: '適合在討論退休金缺口、通膨風險或理想老年生活藍圖時使用。幫助客戶具象化「活多久、領多久」的安心感。',
        keyCuts: DEFAULT_KEY_CUTS
    },
    {
        id: '5',
        title: '你的準備，是孩子起飛的底氣',
        englishTitle: 'Wings for Their Future',
        description: '35-50 歲父母，對接醫療險與儲蓄險',
        price: '498 P',
        image: wingsForFutureImg,
        videoId: 'zKRqIPkDkhU',
        narrativePhilosophy: '教育金規劃不該是冰冷的複利試算，而是父母為孩子預留的「嘗試權」。我們強調的是父母的遠見，如何轉化為孩子探索世界的翅膀。',
        scriptPreview: '「父母的遠見，是孩子看世界時最厚實的底氣。」',
        usageScenario: '適合在與客戶聊到孩子教育、留學計畫或對未來的擔憂時分享。建議作為「家庭責任」討論的開場白。',
        keyCuts: DEFAULT_KEY_CUTS
    },
    {
        id: '6',
        title: '醫療的 VIP 通道 - 關鍵時刻，擁有選擇權的底氣',
        englishTitle: 'The Power of Choice',
        description: '30-55 歲中產階級，對接醫療與重大疾病險',
        price: '398 P',
        image: powerOfChoiceImg,
        narrativePhilosophy: '我們不再恐嚇客戶生病的痛苦，而是賦予他們「選擇權」。強調這份規畫能在關鍵時刻，為家人買下速度、品質與對抗未知的餘裕。',
        scriptPreview: '「怕的不是生病，而是生病時沒有選擇更好的權利。」',
        usageScenario: '適合在分享醫療趨勢、自費項目或健保體系議題後提供給客戶。能有效提升客戶對高品質醫療保障的認同感。',
        keyCuts: DEFAULT_KEY_CUTS
    },
    {
        id: '7',
        title: '真誠是最好的敲門磚 - 把感謝說出口，讓人脈自動上門',
        englishTitle: 'The Power of Gratitude',
        description: '業務新人，對接人脈開發工具',
        price: '298 P',
        image: powerOfGratitudeImg,
        narrativePhilosophy: '以「善意循環」廣告為靈感。描述一個年輕人決定投身保險，是源於生命中感受到的無數善念與幫助。保險不只是合約，而是將這份善意擴大，轉化為照顧更多家庭的行動力。這是一份真誠的使命宣言，建立業務員的職業人格。',
        scriptPreview: '「因為曾被善意照亮，所以我想成為那個守護光亮的人。」',
        usageScenario: '適合業務新人作為「第一張名片」、個人品牌建立或向客戶分享入行初衷時使用，能有效降低銷售防禦心。',
        keyCuts: DEFAULT_KEY_CUTS
    }
];