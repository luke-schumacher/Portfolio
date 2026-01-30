# 🎓 The "Tank & Hose" Guide to Microgrid Simulation

This guide explains how to use the dashboard to find the perfect hardware setup. We use the **Tank & Hose** analogy because electricity behaves just like water.

---

## 📚 Key Concepts

| Concept | The Analogy | Unit | Why it matters |
| :--- | :--- | :--- | :--- |
| **Solar PV** | **The Rain** | `kWp` | Free water falling from the sky. More panels = wider roof to catch it. |
| **Battery Capacity** | **The Tank** | `kWh` | How much water you can store for later (night time). |
| **Battery Power** | **The Hose** | `kW` | How *fast* you can get water out of the tank. |
| **EV Load** | **Thirsty Customers** | `kW` | Cars arriving and demanding water immediately. |
| **Grid** | **The Expensive Truck** | `kWh` | The backup water truck you pay for when your tank is empty or your hose is too slow. |

---

## 🧪 Scenario 1: The "Bottleneck" (The Hose is too small)

**The Situation:** You bought a huge battery, but you still see the system buying power from the grid during the day. Why?

1.  **Set Up:**
    *   Station: *Petro Ivoire GANDHI* (or any busy station).
    *   PV Size: `200 kWp` (Lots of sun).
    *   Battery Capacity: `500 kWh` (Huge Tank).
    *   **Battery Power:** `20 kW` (Tiny Garden Hose).

2.  **Run Simulation.**

3.  **Look at the Chart:**
    *   Zoom in to a busy time (e.g., 12:00 PM).
    *   **Red Line (Load):** Spikes to **100 kW** (Cars charging).
    *   **Blue Line (SOC):** The battery is Full (High SOC).
    *   **Grey Area (Grid):** You are *still* importing **80 kW** from the grid!

4.  **The Diagnosis:**
    *   Your tank was full! Why did you pay for grid power?
    *   **Answer:** Your hose (20 kW) was too narrow. The cars wanted 100 kW. You gave them 20 kW from the battery, and had to buy the other 80 kW from the grid.

5.  **The Fix:**
    *   Increase **Battery Power** to `100 kW`.
    *   Run again. The Grid Import (Grey Area) should disappear.

---

## 🧪 Scenario 2: The "Night Owl" (The Tank is too small)

**The Situation:** The system works perfectly during the day, but fails every night at 8 PM.

1.  **Set Up:**
    *   PV Size: `200 kWp` (Great sun).
    *   **Battery Capacity:** `50 kWh` (Tiny Tank).
    *   Battery Power: `200 kW` (Huge Firehose).

2.  **Run Simulation.**

3.  **Look at the Chart:**
    *   **Green Line (Solar):** Huge curve during the day.
    *   **Blue Line (SOC):** Fills up instantly at 9 AM, then stays flat (100%) all day.
    *   **Grey Area (Grid):** Zero during the day, but huge imports starting at 7 PM.

4.  **The Diagnosis:**
    *   **Wasted Sun:** Your tank filled up in 1 hour. The rest of the day, that sun just overflowed (wasted or exported).
    *   **Empty Night:** When the sun set, your tiny 50 kWh tank drained in 30 minutes. You spent the rest of the night buying grid power.

5.  **The Fix:**
    *   Increase **Battery Capacity** to `300 kWh`.
    *   Now you capture *all* that afternoon sun and have enough stored to last through the night.

---

## 🧪 Scenario 3: The "Rainy Week" (The Roof is too small)

**The Situation:** You have a huge battery and huge power, but the battery slowly dies over 3 days and never recovers.

1.  **Set Up:**
    *   **PV Size:** `20 kWp` (Tiny Roof).
    *   Battery Capacity: `500 kWh` (Huge Tank).
    *   Battery Power: `200 kW` (Huge Firehose).

2.  **Run Simulation.**

3.  **Look at the Chart:**
    *   **Blue Line (SOC):** Starts full, but slowly goes down day after day like a leaking bucket. It never goes back up to 100%.

4.  **The Diagnosis:**
    *   You are spending water faster than you are catching it. Your "Roof" (Solar Array) is too small to refill the tank, no matter how big the tank is.

5.  **The Fix:**
    *   Increase **PV Capacity** to `150 kWp`. You need to catch more rain to keep the tank full.

---

## 🏆 The "Goldilocks" Strategy (How to Win)

Don't just max out everything. That costs millions.

1.  **Find the Peak Load:** Look at the Red Line spikes. If cars hit **150 kW** peak, set your **Battery Power** to `150 kW`. (Fixes the Hose).
2.  **Find the Nightly Demand:** How much energy do you use from 6 PM to 6 AM? Let's say it's **200 kWh**. Set your **Battery Capacity** to `250 kWh` (buffer included). (Fixes the Tank).
3.  **Size the Solar:** You need enough sun to refill that 250 kWh tank in about 6 hours of daylight. Set **PV Capacity** to `~100-150 kWp`. (Fixes the Roof).

**Result:** You have optimized the system. You aren't paying for a 500kW hose you don't use, or a 1000kWh tank you can't fill.
