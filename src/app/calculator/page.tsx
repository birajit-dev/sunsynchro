"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";

interface CalculationResult {
  monthlySaving: number;
  yearlySaving: number;
  requiredKW: number;
  yearlyGeneration: number;
  co2ReducedKgPerYear: number;
  simplePaybackYears: number;
}

export default function CalculatorPage() {
  // Use string state for better mobile input handling (allows "")
  const [monthlyBill, setMonthlyBill] = useState("2000");
  const [unitPrice, setUnitPrice] = useState("7.0");

  const [result, setResult] = useState<CalculationResult | null>(null);

  const ASSUMPTIONS = {
    // Typical India rooftop generation band is around 110-140 units/month/kW.
    monthlyUnitsPerKw: 120,
    // Not every generated unit offsets billed energy perfectly.
    effectiveOffsetRatio: 0.9,
    // Broad-market estimate used internally for payback.
    systemCostPerKw: 55000,
    // Approx grid emission factor for awareness estimate.
    gridEmissionKgPerKwh: 0.736,
  };

  const format = (num: number, currency: boolean = false): string => {
    if (isNaN(num) || !isFinite(num)) return "—";
    return currency
      ? "₹" + Number(num).toLocaleString("en-IN", { maximumFractionDigits: 0 })
      : Number(num).toLocaleString("en-IN", { maximumFractionDigits: 2 });
  };

  const calculate = () => {
    const monthlyBillNum = parseFloat(monthlyBill || "0");
    const unitPriceNum = parseFloat(unitPrice || "0");

    if (monthlyBillNum <= 0 || unitPriceNum <= 0) {
      setResult(null);
      return;
    }

    // Estimated monthly units consumed = monthly bill / per unit rate
    const monthlyUnits = monthlyBillNum / unitPriceNum;

    // Size based on typical monthly generation per kW.
    const rawRequiredKw = monthlyUnits / ASSUMPTIONS.monthlyUnitsPerKw;
    // Round to nearest 0.5 kW (common market sizing).
    const requiredKW = Math.max(0.5, Math.round(rawRequiredKw * 2) / 2);

    const generatedMonthlyUnits = requiredKW * ASSUMPTIONS.monthlyUnitsPerKw;
    const effectiveOffsetUnits = Math.min(
      monthlyUnits,
      generatedMonthlyUnits * ASSUMPTIONS.effectiveOffsetRatio
    );
    const monthlySaving = effectiveOffsetUnits * unitPriceNum;
    const yearlySaving = monthlySaving * 12;
    const yearlyGeneration = generatedMonthlyUnits * 12;
    const estimatedSystemCost = requiredKW * ASSUMPTIONS.systemCostPerKw;
    const simplePaybackYears =
      yearlySaving > 0 ? estimatedSystemCost / yearlySaving : 0;
    const co2ReducedKgPerYear =
      yearlyGeneration * ASSUMPTIONS.gridEmissionKgPerKwh;

    setResult({
      monthlySaving,
      yearlySaving,
      requiredKW,
      yearlyGeneration,
      co2ReducedKgPerYear,
      simplePaybackYears,
    });
  };

  const handleReset = () => {
    setMonthlyBill("2000");
    setUnitPrice("7.0");
    setResult(null);
  };

  const handlePrint = () => {
    window.print();
  };

  // Handler for input to allow true empty string and only allow numbers/decimal
  const handleMonthlyBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    // Allow empty string (user deletes), or only digits
    if (/^\d*$/.test(v) || /^\d+\.\d{0,2}$/.test(v) || v === "") {
      setMonthlyBill(v);
    }
  };

  const handleUnitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    // Allow empty string, or valid decimal
    if (/^\d*\.?\d{0,2}$/.test(v) || v === "") {
      setUnitPrice(v);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex items-center gap-4 mb-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-[#0ea5a4] to-[#0d9493] rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
              <span className="text-white text-3xl font-bold">S</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-[#0ea5a4] to-[#0d9493] bg-clip-text text-transparent">
                Sunsynchro — Solar Calculator
              </h1>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                Enter only your monthly average electricity bill and unit price
                to estimate the right solar size, savings, payback, and impact.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
            {/* Input Card */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Input (Only 2 fields)
                </h3>
              </div>
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Average Monthly Electricity Bill (₹)
                </label>
                <input
                  inputMode="numeric"
                  pattern="[0-9]*"
                  type="text"
                  min="0"
                  step="1"
                  value={monthlyBill}
                  onChange={handleMonthlyBillChange}
                  onKeyDown={(e) => { if (e.key === "Enter") calculate(); }}
                  placeholder="2000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-all hover:border-gray-300"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Price per Unit (₹ / kWh)
                </label>
                <input
                  inputMode="decimal"
                  pattern="[0-9]*\.?[0-9]*"
                  type="text"
                  min="0"
                  step="0.01"
                  value={unitPrice}
                  onChange={handleUnitPriceChange}
                  onKeyDown={(e) => { if (e.key === "Enter") calculate(); }}
                  placeholder="7.0"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-all hover:border-gray-300"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 items-center pt-4 border-t border-gray-200">
                <button
                  onClick={calculate}
                  className="px-6 py-3 bg-gradient-to-r from-[#0ea5a4] to-[#0d9493] text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all text-sm"
                >
                  Calculate
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all text-sm"
                >
                  Reset
                </button>
                <div className="ml-auto flex gap-2 print:hidden">
                  <button
                    onClick={handlePrint}
                    className="px-5 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all text-sm"
                  >
                    Print
                  </button>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    <strong>Tip:</strong> We estimate system size & savings based on average units per month.
                    <br />
                    Your bill is <b>NOT</b> directly your savings:
                    <br />
                    <span className="text-gray-700">Solar savings = offset units × per unit price.<br />
                    System size = monthly units / 120 (units/month/kW in India typical).</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Results Card */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 lg:sticky lg:top-24 h-fit">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Results
                </h3>
              </div>

              {result && (
                <div className="space-y-7">
                  <div className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Quick Summary</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                      <div className="font-bold text-gray-900 text-lg">
                        {format(result.monthlySaving, true)}
                      </div>
                      <div className="text-xs text-gray-600 mt-1 font-medium">
                        Monthly Saving*
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                      <div className="font-bold text-gray-900 text-lg">
                        {format(result.yearlySaving, true)}
                      </div>
                      <div className="text-xs text-gray-600 mt-1 font-medium">
                        Yearly Saving*
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200 col-span-2 mt-2">
                      <div className="font-bold text-gray-900 text-lg">
                        {result.requiredKW > 0 ? result.requiredKW.toFixed(2) : "--"} kW
                      </div>
                      <div className="text-xs text-gray-600 mt-1 font-medium">
                        Estimated Solar System Size Required
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-xl border border-teal-200">
                      <div className="font-bold text-gray-900 text-lg">
                        {result.simplePaybackYears > 0
                          ? `${result.simplePaybackYears.toFixed(1)} yrs`
                          : "--"}
                      </div>
                      <div className="text-xs text-gray-600 mt-1 font-medium">
                        Simple Payback
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200">
                      <div className="font-bold text-gray-900 text-lg">
                        {format(result.co2ReducedKgPerYear / 1000)} t/yr
                      </div>
                      <div className="text-xs text-gray-600 mt-1 font-medium">
                        CO2 Reduced (Est.)
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg">
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Inputs are only monthly bill and unit price; all other values are estimated with standard assumptions.</li>
                      <li>Your savings are based on effective units offset by solar multiplied by your per unit rate.</li>
                      <li>Your savings do <b>not</b> always equal your bill due to export/consumption timing and tariff slabs.</li>
                      <li>
                        <b>Why saving can be lower than bill:</b> generation, usage timing, and billing slabs can vary month to month.
                      </li>
                      <li>Estimated annual generation: {format(result.yearlyGeneration)} units.</li>
                    </ul>
                  </div>
                </div>
              )}

              {!result && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">
                    Press 'Calculate' to see your savings and recommended solar system size.
                  </p>
                </div>
              )}
              <footer className="mt-8 pt-6 border-t-2 border-gray-200">
                <div className="text-sm font-bold text-gray-900 mb-1">
                  Sunsynchro Pvt. Ltd.
                </div>
                <div className="text-xs text-gray-600 mb-3">
                  Contact: 9742422340 | Web: sunsynchro.com
                </div>
                <div className="text-xs text-gray-500 leading-relaxed bg-gray-50 p-3 rounded-lg">
                  <strong>Note:</strong> Calculator uses fixed assumptions (120 units/month/kW generation, 90% effective offset, and ₹55,000/kW benchmark cost).<br />
                  Actual quote and savings vary with roof conditions, DISCOM net-metering policy, product quality, and usage pattern.
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
