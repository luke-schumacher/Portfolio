# User Guide: Petro Ivoire EV Microgrid Simulator

## 📖 In Simple Terms: What have we built?

Imagine you are playing "SimCity" for an electric vehicle (EV) charging station. We have built a digital twin of your stations that allows us to answer expensive questions without spending a dime.

**What we did:**
1.  **Digitized the History:** We took the raw logs of every car that charged at your stations (timestamps, energy used) and turned them into a clean, 24/7 timeline of energy demand.
2.  **Virtual Hardware:** We added "virtual" solar panels and batteries to these stations.
3.  **The Simulation:** We can now replay history. We ask the computer: *"If we had a 100kW battery last month, how much money would we have saved? How much less power would we have needed from the national grid?"*
4.  **AI Advisor:** We added a smart assistant that watches the simulation and suggests improvements, like "Your battery is too small for this load."

**Why this matters:**
It prevents over-spending on hardware. Instead of guessing that you need a huge battery, we simulate it first to find the "sweet spot" size that gives the best return on investment.

---

## 🚀 Technical Instructions

The project is containerized with Docker for easy setup.

### Prerequisites
- Docker Desktop installed and running.

### Running the Dashboard

1.  **Build the Container:**
    ```bash
    docker-compose build
    ```

2.  **Run the Simulation:**
    ```bash
    docker-compose up
    ```

3.  **Access the Dashboard:**
    Open your browser and navigate to: [http://localhost:8501](http://localhost:8501)

## 📂 Project Features

-   **Interactive Dashboard:** Adjust hardware sizing (PV, Battery) and simulation dates on the fly.
-   **Real Data Integration:** Uses historical EV session data from `data/sessions_toutes-dates.csv`.
-   **Advanced Tariff Engine:** Configure complex electricity rates:
    -   **Time-of-Use (TOU):** Set peak vs. off-peak hours and rates.
    -   **Demand Charges:** Simulate penalties for high power usage ($/kW).
-   **Solar Intelligence:** 
    -   **NASA POWER Integration:** Connects to satellite data for realistic solar irradiance in Abidjan.
    -   **Synthetic Fallback:** Uses a Gaussian model if offline.
-   **AI Energy Advisor:** Provides real-time heuristics and recommendations (e.g., "Battery is under-utilized", "High Grid Dependency").
-   **Scenario Comparison:** Save and compare multiple hardware configurations side-by-side to find the best ROI.
-   **Station Metadata:** Automatically loads power limits and specific constraints for sites like *Petro Ivoire GANDHI* and *ANGRÉ*.
-   **Visualization:** Interactive charts for Energy Balance (Load vs Solar vs Grid) and Battery State of Charge (SOC).

## 🛠 Troubleshooting

-   **Port Conflicts:** If port 8501 is in use, modify the `ports` mapping in `docker-compose.yml`.
-   **Data Errors:** Ensure `data/sessions_toutes-dates.csv` is present.
-   **Solar Data:** First run with "Use NASA POWER" may be slow as it fetches and caches data.
