// 在页面加载时锁定 signup 按钮
document.addEventListener("DOMContentLoaded", function() {
    const signupButton = document.getElementById("signup");
    signupButton.disabled = true; // 锁定 signup 按钮
    signupButton.style.backgroundColor = "#999999"; // 更改按钮颜色
    signupButton.style.color = "white"; // 可选: 更改文字颜色以提高可读性
    signupButton.innerText = '請先同意使用協議後再完成註冊';
});

document.getElementById("agreement").addEventListener("click", function() {
    // 创建弹出窗口
    const modal = document.createElement("div");
    modal.id = "agreementModal";
    modal.style.display = "flex"; // 显示弹出窗口
    modal.style.position = "fixed";
    modal.style.zIndex = "1000";
    modal.style.left = "0";
    modal.style.top = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // 半透明背景
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";

    // 创建内容区域
    const content = document.createElement("div");
    content.style.backgroundColor = "white";
    content.style.padding = "20px";
    content.style.borderRadius = "8px";
    content.style.maxWidth = "600px";
    content.style.width = "90%";
    content.style.overflowY = "scroll";
    content.style.maxHeight = "80%";
    content.style.scrollbarWidth = "none"; // Firefox
    content.style.msOverflowStyle = "none"; // Internet Explorer and Edge
    content.style.overflow = "-moz-scrollbars-none"; // 隐藏滚动条，但保留滚动功能

    // 对于Webkit浏览器
    const style = document.createElement('style');
    style.innerHTML = `
        #agreementModal div::-webkit-scrollbar {
            display: none; /* Chrome, Safari 和 Opera */
        }
    `;
    document.head.appendChild(style);

    // 添加协议内容
    content.style.padding = "5%";
    content.innerHTML = `
    <h1>ANON用戶使用協議</h1>
    <section>
        <p>本用戶使用協議（以下稱「本協議」）是匿名「股份無限」公司（ANON.ultd）據以營運ANON網站及社群服務（以下稱「ANON服務」或「服務」）的基本約款，規範ANON與用戶的關係。</p>
        <p>請注意，「股份無限公司」非屬中華民國法律所定義之公司範疇；即「匿名股份無限公司」非為登記設立經營之公司。</p>
        <p>在您成為ANON服務的使用者前，請您先完整閱讀並確認您同意本協議的全部內容，如有任何不同意之處，請勿使用ANON服務。一旦您成為ANON服務的用戶，即表示您已了解並同意遵守本協議中的所有條款。</p>
    </section>
    <section>
        <h2>A. 訪問和網頁使用</h2>
        <P>關於ANON用戶網頁的訪問和使用，您聲明並保證以下事項：</P>
        <ol>
            <li>如果您未滿十八歲或根據中華民國法律需經第三人同意才能行使權利或承擔義務，則您必須取得父母、監護人或該第三人的同意後，才能訪問網頁並使用ANON服務。當您完成訪問或開始使用服務時，即表示您的父母、監護人或該第三人已充分審閱、了解並同意本協議條款，並同意您訪問網頁成為用戶及使用服務。</li>
            <li>您同意，使用服務的所有內容，包括意思表示等，均以電子文件的方式表達，且ANON對您的所有通知皆以電子郵件或其他電子方式進行。</li>
            <li>就訪問程序所要求的真實姓名及其他資料，您提供的資訊均為最新且真實的，如有任何變動會即時更新。</li>
            <li>您並非為他人訪問網頁。</li>
            <li>您未曾也不會訪問多於一個校版網頁。</li>
            <li>如果您的訪問遭停權，您不會訪問其他網頁。</li>
            <li>您的訪問需經ANON審核後可供使用者訪問之IP認證，才能使用完整ANON服務；若使用非許可IP訪問，部分功能將受限。</li>
            <li>您理解並同意，任何以您的設備在ANON服務中所為行為，均視為您本人或經您授權所為，因此您可能必須承擔相應的法律責任。您不會讓其他人透過您的設備使用ANON服務，亦不會將您的設備密碼透露與他人知悉。</li>
            <li>您理解並同意，ANON為一開放性社群平台，除特定頁面限制瀏覽身份外，一般使用者均可自由瀏覽ANON的所有公開頁面。ANON無法防止第三人將用戶內容與您聯想在一起，因此在發表文章、回應或與其他使用者對話時，請注意您所揭露的資訊可能會導致陌生人或您的親友辨識您的真實身份，並對您的現實生活產生影響。</li>
        </ol>
    </section>
    <section>
        <h2>B. 簽名、稱謂設定與使用</h2>
        <p>關於您若於使用ANON服務時加註簽名及稱謂的設定與使用，您已詳細了解並聲明、保證以下事項：</p>
        <ol>
            <li>您認知，若使用其他網站或通訊軟體使用的網頁名稱、暱稱作為ANON的簽名及稱謂，將容易使您的身份被連結、搜尋及勾稽，您應自負其責。</li>
            <li>您不會以與已註冊商標或他人商品或服務相關的名稱作為自己的簽名或稱謂。ANON有權自行判斷並收回您的簽名或稱謂並交予權利人使用，您不得有任何異議。</li>
            <li>您不會以影射、謾罵、誹謗、冒名等違反網路禮節、社會秩序或違法的文字作為您的簽名及稱謂。ANON有權自行判斷並註銷具上述性質的簽名及稱謂，您不得有任何異議。</li>
            <li>您不會以疑似ANON官方的文字作為您的簽名及稱謂。若名稱含有特殊字元、空白字元或特殊符號或類似ANON人員名稱，ANON有權自行判斷直接更名，您不得有任何異議。</li>
            <li>您若違反相關規定，ANON有權自行判斷做出適當的處置，您同意完全遵循ANON的決定。</li>
        </ol>
    </section>
    <section>
        <h2>C. 個人資料及隱私保護</h2>
        <p>ANON將依法保護您的個人資料及隱私。您了解並確認ANON已依據個人資料保護法第8條第1項明確告知與個人資料保護有關事項如下：</p>
        <ol>
            <li>蒐集目的：</li>
            <p>ANON蒐集您的個人資料以提供您ANON服務，特定目的包括：</p>
                <ol>
                    <li>行銷（特定目的項目040）</li>
                    <li>用戶或其他成員名冊之內部管理（特定目的項目052）</li>
                    <li>非公務機關依法定義務所進行個人資料之蒐集處理及利用（特定目的項目063）</li>
                    <li>契約、類契約或其他法律關係事務（特定目的項目069）</li>
                    <li>消費者、客戶管理與服務（特定目的項目090）</li>
                    <li>廣告或商業行為管理（特定目的項目152）</li>
                    <li>影視、音樂與媒體管理（特定目的項目153）</li>
                    <li>調查、統計與研究分析（特定目的項目157）</li>
                    <li>其他與ANON服務相關的利用，例如為了解您的使用情形，我們可能單獨邀請您前來ANON接受訪談，或在您另外明確同意後，與第三方廠商共同辦理行銷活動。</li>
                </ol>
            <li>蒐集類別：</li>
            <p>因您使用ANON服務的程度不同，我們可能因主動或被動蒐集您的訪問資料、使用ANON服務的活動記錄，包括但不限於您的所在位置、閱讀文章的喜好、與其他使用者的互動（包括留言等）、上網的IP位址、裝置資訊、使用時間、瀏覽及點選記錄及其他ANON因您使用服務所取得的一切資訊，實際資料端視您的使用情形，惟可能包括下列類型：</p>
                <ol>
                    <li>辨識個人者：如姓名、職稱、住址、工作地址、以前地址、住家電話號碼、行動電話、即時通網頁、網路平台申請之網頁、通訊及戶籍地址、相片、電子郵遞地址、電子簽章、憑證卡序號、憑證序號、提供網路身份認證或申辦查詢服務之紀錄及其他任何可辨識本人者等。（類別代號C001）</li>
                    <li>個人描述：如年齡、性別、出生年月日、出生地、國籍等。（類別代號C011）</li>
                    <li>身體描述：如身高、體重、血型等。（類別代號C012）</li>
                    <li>習慣：如抽菸、喝酒等。（類別代號C013）</li>
                    <li>個性：如個性等評述意見。（類別代號C014）</li>
                    <li>家庭情形：如婚姻狀況、有無子女等。（類別代號C021）</li>
                    <li>家庭其他成員之細節：如子女、受扶養人、家庭其他成員或親屬、父母、同居人及居國外及大陸地區人民親屬等。（類別代號C023）</li>
                    <li>住家及設施：如住所地址、房屋種類、價值及所有人姓名等。（類別代號C031）</li>
                    <li>財產：如所有或具有其他權利之動產或不動產等。（類別代號C032）</li>
                    <li>旅行及其他遷徙細節：如過去之遷徙、旅行細節、外國護照、居留證明文件及工作證照及工作證等相關細節等。（類別代號C034）</li>
                    <li>休閒活動及興趣：如嗜好、運動及其他興趣等。（類別代號C035）</li>
                    <li>生活格調：如使用消費品之種類及服務之細節、個人或家庭之消費模式等。（類別代號C036）</li>
                    <li>職業：如各種職業等。（類別代號C038）</li>
                    <li>執照或其他許可：如駕駛執照、行車執照等。（類別代號C039）</li>
                    <li>學校紀錄：如大學、專科或其他學校之修業細節等。（類別代號C041）</li>
                    <li>工作資格：如國內或國外之資格、執業資格或許可、技術等級及特定行業之行業許可等。（類別代號C042）</li>
                    <li>個人及其他契約：如對價關係契約之債權債務關係等。（類別代號C043）</li>
                    <li>工作經驗：如職務、工作單位、工作時數及年資等。（類別代號C044）</li>
                    <li>專業技術：如工作經驗、專業能力、各項技術之能級等。（類別代號C045）</li>
                    <li>區域電話使用者名冊：如電話號碼等。（類別代號C046）</li>
                    <li>學校志願表：如志願表等。（類別代號C048）</li>
                    <li>駕駛記錄：如交通違規、事故、駕駛紀錄等。（類別代號C049）</li>
                    <li>財稅案件：如繳稅紀錄等。（類別代號C051）</li>
                    <li>各類電子支付、行動支付之交易資料：如交易對象、時間、金額、交易地點、交易方式、交易物品及服務種類、交易項目、交易紀錄等。（類別代號C065）</li>
                    <li>金融交易資料：如金融帳號及相關交易資料等。（類別代號C066）</li>
                    <li>投資資料：如各項有價證券及交易細節等。（類別代號C068）</li>
                    <li>借貸資料：如個人或家庭之借貸或負債等。（類別代號C069）</li>
                    <li>相關手續費用：如手續費及其他相關費用等。（類別代號C070）</li>
                    <li>遺產：如繼承遺產等細節。（類別代號C071）</li>
                    <li>保險事故紀錄：如投保、保險理賠等細節。（類別代號C072）</li>
                    <li>僱傭契約：如僱用、雇傭契約等。（類別代號C073）</li>
                    <li>退休資料：如退休後之金額等。（類別代號C074）</li>
                    <li>特別加值之資料：如加值電子票證、會員卡、通行卡等使用資料、交易紀錄、消費紀錄、加值紀錄、點數紀錄等。（類別代號C076）</li>
                    <li>信用卡及金融卡資料：如信用卡帳號及相關交易資料等。（類別代號C078）</li>
                    <li>影視、音樂及媒體：如音樂、影視節目及其他多媒體、線上影音等資料。（類別代號C081）</li>
                    <li>公共事務：如法律、社會政策及公共事務等資料。（類別代號C082）</li>
                    <li>生活：如居住、購物、交通、飲食、娛樂、教育、醫療及健康等資料。（類別代號C083）</li>
                    <li>學習紀錄：如在學校或其他學習機構之學習紀錄等。（類別代號C085）</li>
                    <li>消費習慣及交易偏好：如在購物網站之消費習慣及偏好等資料。（類別代號C088）</li>
                    <li>其他個人資料：如您與ANON通訊或以其他方式與ANON互動所提供之資訊或反饋，或在特定活動或專案中提供的資料。</li>
                </ol>
            <li>蒐集期間：</li>
            <p>根據您的使用情況，我們將在提供ANON服務期間及法律要求的最長期間內保存您的個人資料。</p>
            <li>蒐集地區：</li>
            <p>您的個人資料將儲存在中華民國或ANON設置的伺服器所在的任何國家或地區。</p>
            <li>使用方式：</li>
                <ol>
                    <li>ANON可能會透過電子郵件、訊息通知或其他方式向您發送ANON服務或ANON相關的資訊，包括但不限於更新通知、系統通知、服務更新或中斷通知等。</li>
                    <li>為了提供更好的服務，我們可能會利用您的資料進行統計、分析、研究、行銷或其他特定用途。</li>
                    <li>您理解並同意，ANON可能會與第三方合作伙伴共享您的資料以提供特定的服務或功能，如行銷活動、技術支援等。此類合作夥伴須遵循ANON的保密及隱私政策，並僅限於上述特定目的的必要範圍內使用您的資料。</li>
                    <li>您理解並同意，ANON可能會因應法律要求或保護ANON或第三方的權益，依法提供您的資料予有關機關或其他第三方。</li>
                </ol>
            <li>資料主體的權利：</li>
            <P>您對於ANON所持有的您的個人資料，有權行使以下權利：</P>
                <ol>
                    <li>查詢或請求閱覽。</li>
                    <li>請求製作副本。</li>
                    <li>請求補充或更正。</li>
                    <li>請求停止蒐集、處理或利用。</li>
                    <li>請求刪除。</li>
                </ol>
        </ol>
    </section>
    <section>
        <h2>D. 用戶行為規範</h2>
        <ol>
            <li>禁止內容：</li>
            <P>您承諾不會在ANON服務中發佈、傳送、散佈任何違法、侵權、不當、不雅或其他不符合社會倫理道德的內容，包括但不限於：</P>
            <ol>
                <li>涉及侮辱、誹謗、騷擾、歧視、猥褻、暴力或仇恨言論。</li>
                <li>含有虛假、誤導性、欺詐性或不實資訊。</li>
                <li>侵犯他人的隱私權、肖像權、著作權或其他知識產權。</li>
                <li>含有病毒、惡意軟件、蠕蟲或其他可能損害ANON系統或第三方的內容。</li>
                <li>使用虛假帳號進行瀏覽、留言、傳送訊息或其他。</li>
                <li>以任何方式干擾、破壞或損害ANON服務的正常運作。</li>
            </ol>
            <li>合法使用：</li>
            <p>您同意在使用ANON服務時，遵守所有適用的法律法規，包括但不限於中華民國相關法律。</p>
            <li>違規處置：</li>
            <p>ANON保留自行判斷並對違反本協議的用戶採取適當處置的權利，包括但不限於警告、限制或終止使用者訪問ANON服務、刪除不當內容、凍結或禁止用戶訪問服務。</p>
            <li>後悔代碼：</li>
            <p>您同意後悔代碼僅在匿名內容被成功傳送後至被審核前的狀況下有效。</p>
        </ol>
    </section>
    <section>
        <h2>E. 服務中斷及責任限制</h2>
        <ol>
            <li>服務中斷：</li>
            <p>ANON可能因維護、升級或其他原因暫停或中斷部分或全部ANON服務。ANON將盡可能提前通知用戶，但不承擔因服務中斷或暫停導致的任何責任。</p>
            <li>責任限制：</li>
            <p>ANON不對因使用或無法使用ANON服務而產生的任何直接、間接、附帶、特殊、懲罰性或其他損害負責。包括但不限於數據丟失、利潤損失、業務中斷等。</p>
            <p>若擔心您的匿名內容丟失，請提前備份。</p>
        </ol>
    </section>
    <section>
        <h2>F. 知識產權</h2>
        <ol>
            <li>ANON服務中所有內容，包括但不限於文字、圖像、音頻、視頻、軟體、代碼及其他資訊，均屬ANON或其授權人所有的知識產權，受相關法律保護。除非事先取得ANON的書面同意，您不得以任何形式複製、改編、散佈或以其他方式使用這些內容。</li>
            <li>您在ANON服務中發佈的任何內容，包括但不限於評論、圖片、影片等，均屬於您的知識產權，但您授予ANON全球性、非排他性、免費的許可權，以在ANON服務中使用、展示、傳送、散佈及宣傳該等內容。</li>
        </ol>
    </section>
    <section>
        <h2>G. 變更及終止</h2>
        <ol>
            <li>本協議的變更：</li>
            <p>ANON保留隨時修改本協議的權利。ANON將通過電子郵件或其他方式通知您本協議的任何變更。若您在本協議變更後繼續使用ANON服務，即表示您同意接受該等變更。</p>
            <li>服務終止：</li>
            <p>ANON保留在任何時候自行決定終止部分或全部ANON服務的權利，並不需承擔任何責任。</p>
        </ol>
    </section>
    <section>
        <h2>H. 其他條款</h2>
        <ol>
            <li>不可抗力：</li>
            <p>若因天災、戰爭、罷工、政府命令、網路中斷或其他ANON無法控制的原因導致ANON無法正常提供服務，ANON不承擔任何責任。</p>
            <li>法律適用：</li>
            <p>本協議受中華民國法律管轄。若因本協議引起的任何爭議，應約定第一審法院為臺灣新北地方法院管轄。</p>
            <li>協議完整性：</li>
            <p>本協議構成您與ANON之間的完整協議，取代任何先前的口頭或書面協議。若本協議的任何條款被視為無效或不可執行，其餘條款仍應繼續有效。</p>
        </ol>
    </section>
    <button id="closeModal">我同意</button>
    `;

    // 将内容添加到弹出窗口
    modal.appendChild(content);
    document.body.appendChild(modal);

    // 添加关闭按钮的事件监听
    document.getElementById("closeModal").addEventListener("click", function() {
        modal.style.display = "none"; // 隐藏弹出窗口
        document.body.removeChild(modal); // 从DOM中移除

        // 锁定 agreeButton 并更改其颜色
        const agreeButton = document.getElementById("agreement");
        agreeButton.disabled = true; // 锁定按钮
        agreeButton.style.backgroundColor = "green"; // 更改按钮颜色
        agreeButton.style.color = "white"; // 可选: 更改文字颜色以提高可读性
        agreeButton.innerText = '已同意使用協議';

        const signupButton = document.getElementById("signup");
        signupButton.disabled = false; // 解除锁定
        signupButton.style.backgroundColor = "black"; // 更改按钮颜色为红色
        signupButton.style.color = "white"; // 可选: 更改文字颜色以提高可读性
        signupButton.innerText = '完成註冊';
    });
});