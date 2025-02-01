# **📊 People Flow and Tourist Attractions Visualization System**

🚀 **This is a visualization system based on Chart.js and Google Trends**, designed to display **people flow trends** across different cities and show the **top trending tourist attractions** for a selected month.

---

## **📌 Project Overview**
The goal of this project is to provide an **interactive visualization** where users can:
- View **people flow trends** for different months.
- Click on a month to **display the top trending tourist attractions**.
- Use **Chart.js** for dynamic **line charts**.
- Utilize **Leaflet.js** for interactive city selection.
- Ensure **responsive font sizes** for both desktop and mobile devices.

---

## **🛠️ Technologies Used**
- **HTML / CSS / JavaScript** - Frontend development
- **Chart.js** - For generating interactive charts
- **Leaflet.js** - For map functionalities
- **Google Trends API** - To fetch trending tourist attractions
- **JSON Database** - To store people flow and trends data

---

## **📂 Project Structure**
```bash
📁 project-root
│── 📁 data               # Stores people flow and Google Trends JSON data
│    ├── city_traffic.json         # People flow data for different cities
│    ├── city_Google_Trends.json   # Google Trends data for top tourist attractions
│── 📁 static             # Stores static assets
│    ├── leaflet.js       # Map functionalities
│    ├── style.css        # Stylesheet
│    ├── script.js        # Main JavaScript logic
│── index.html            # City selection page (Map)
│── template.html         # People flow visualization page
│── README.md             # Project documentation


## **🚀 Installation and Usage**
**1️⃣ Clone the Project**
```bash
git clone https://github.com/your-repo/project.git
cd project
```

**2️⃣ Start a Local Server**
Since the project uses ```fetch()``` to load JSON files, you need to run a local server:
```bash
# Use Python's built-in HTTP server (for Python 3)
python -m http.server 8000
```
Then, open http://localhost:8000/index.html in your browser.

## 📌 How to Use
**🔹 1. Open index.html**
- A map of Fukui Prefecture will be displayed.
- Click on a city marker to navigate to the people flow visualization page.
**🔹 2. Open template.html**
- View the people flow trend chart for the selected city.
- Click on a point in the chart to see top trending tourist attractions for that month.
- The Google Trends ranking table updates automatically.

## 🌟 Features
✅ Visualizes people flow trends
✅ Click on a month to update top trending attractions
✅ Interactive map for city selection
✅ Fully responsive UI with dynamic font sizing
✅ Animated Chart.js line chart
✅ Uses fetch() to load JSON data dynamically
