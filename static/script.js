const map = L.map('map').setView([35.942, 136.188], 9);

// 添加地圖圖層
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// 🏙️ 設定自訂的標記圖示
const defaultIcon = L.icon({
    iconUrl: 'static/icons/default-marker.png', // 替換成你自己的圖示
    iconSize: [40, 40],  // ✅ 調整標記大小，使其更容易點擊
    iconAnchor: [17, 45], 
    popupAnchor: [0, -40]
});

const highlightIcon = L.icon({
    iconUrl: 'static/icons/default-marker.png', 
    iconSize: [60, 60],  // ✅ 滑鼠移過去時變大
    iconAnchor: [20, 50], 
    popupAnchor: [0, -45]
});

// 📍 定義福井縣所有市町的標記，包含 **對應的景點圖片**
const regions = [
    // ✅ 福井市區
    { name: "福井市", coords: [36.0641, 136.2192], img: "static/images/fukui.jpg" },
    { name: "坂井市", coords: [36.1676, 136.2222], img: "static/images/sakai.jpg" },
    { name: "越前市", coords: [35.9044, 136.1689], img: "static/images/echizen.jpg" },
    { name: "鯖江市", coords: [35.9468, 136.1844], img: "static/images/sabae.jpg" },
    { name: "敦賀市", coords: [35.6451, 136.0556], img: "static/images/tsuruga.jpg" },
    { name: "大野市", coords: [35.9814, 136.4883], img: "static/images/ono.jpg" },
    { name: "小浜市", coords: [35.4958, 135.7468], img: "static/images/obama.jpg" },
    { name: "蘆原市", coords: [36.2111, 136.2794], img: "static/images/awara.jpg" },
    { name: "勝山市", coords: [36.0585, 136.5008], img: "static/images/katsuyama.jpg" },

    // ✅ 町村（町）
    { name: "永平寺町", coords: [36.0913, 136.3871], img: "static/images/eiheiji.jpg" },
    { name: "池田町", coords: [35.8753, 136.2474], img: "static/images/ikeda.jpg" },
    { name: "南越前町", coords: [35.7564, 136.0553], img: "static/images/minami-echizen.jpeg" },
    { name: "越前町", coords: [35.9675, 136.1092], img: "static/images/echizen-town.jpg" },

    // ✅ 若狹地區（敦賀市、小濱市、美濱町、若狹町、高濱町、大飯町）
    { name: "美浜町", coords: [35.5856, 135.9932], img: "static/images/mihama.jpg" },
    { name: "若狭町", coords: [35.4801, 135.9256], img: "static/images/wakasa.jpg" },
    { name: "高浜町", coords: [35.4782, 135.5271], img: "static/images/takahama.jpg" },
    { name: "大飯町", coords: [35.4825, 135.6467], img: "static/images/ooi.jpeg" }
];
// 📍 添加標記點及點擊事件
regions.forEach(region => {
    const marker = L.marker(region.coords, { 
        icon: defaultIcon, 
        interactive: true,  
        riseOnHover: true   
    }).addTo(map);

    // 📍 **直接顯示景點圖片**
    marker.bindPopup(`
        <div style="text-align:center; padding:10px; width: 200px;">
            <h3 style="margin:5px 0; font-size:16px; color:#333;">${region.name}</h3>
            <img src="${region.img}" width="150px" style="border-radius:10px;"><br>
            <button onclick="goToCityPage('${region.name}')" 
                style="display:inline-block; margin-top:10px; padding:8px 15px; background:#007bff; color:white; border:none; border-radius:5px; cursor:pointer;">
                詳細を見る
            </button>
        </div>
    `);

    // 📌 滑鼠懸停時，標記變大
    marker.on("mouseover", function () {
        this.setIcon(highlightIcon);
    });

    marker.on("mouseout", function () {
        this.setIcon(defaultIcon);
    });
});

// ✅ 點擊「詳細を見る」按鈕才跳轉
function goToCityPage(region) {
    window.location.href = `template.html?city=${encodeURIComponent(region)}`;
}

// 📌 讓地圖隨視窗大小變動
window.addEventListener("resize", function () {
    map.invalidateSize();
});