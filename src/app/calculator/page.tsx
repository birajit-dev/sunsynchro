"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

interface CashflowRow {
  y: number;
  gen: number;
  savings: number;
  cum: number;
}

interface CalculationResult {
  systemSize: number;
  genPerYear: number;
  firstYearSavings: number;
  simplePayback: number;
  systemCost: number;
  rows: CashflowRow[];
}

export default function CalculatorPage() {
  const [mode, setMode] = useState<"system" | "consumption">("system");
  const [systemSize, setSystemSize] = useState(5);
  const [monthlyConsumption, setMonthlyConsumption] = useState(350);
  const [targetOffset, setTargetOffset] = useState(80);
  const [sunHours, setSunHours] = useState(4.2);
  const [perf, setPerf] = useState(0.78);
  const [tariff, setTariff] = useState(7.0);
  const [costPerKw, setCostPerKw] = useState(85000);
  const [selfCons, setSelfCons] = useState(0.8);
  const [exportRate, setExportRate] = useState(3);
  const [escalation, setEscalation] = useState(3);
  const [life, setLife] = useState(25);
  const [co2factor, setCo2factor] = useState(0.82);
  const [degrade, setDegrade] = useState(0.5);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const format = (num: number, currency: boolean = false): string => {
    if (isNaN(num) || !isFinite(num)) return "—";
    return currency
      ? "₹" + Number(num).toLocaleString("en-IN", { maximumFractionDigits: 0 })
      : Number(num).toLocaleString("en-IN", { maximumFractionDigits: 2 });
  };

  const calculate = () => {
    let calculatedSystemSize = systemSize;

    // Estimate system size from consumption if needed
    if (mode === "consumption") {
      const annualCons = monthlyConsumption * 12;
      const genPerKw = sunHours * 365 * perf;
      const genNeeded = (targetOffset / 100) * annualCons;
      calculatedSystemSize = genNeeded / Math.max(selfCons, 0.01) / genPerKw;
    }

    const genPerYear = calculatedSystemSize * sunHours * 365 * perf; // kWh

    const selfUsed = genPerYear * selfCons;
    const exported = Math.max(0, genPerYear - selfUsed);
    const firstYearSavings = selfUsed * tariff + exported * exportRate;

    const systemCost = calculatedSystemSize * costPerKw;
    const simplePayback =
      firstYearSavings > 0 ? systemCost / firstYearSavings : Infinity;

    const rows: CashflowRow[] = [];
    let curTariff = tariff;
    let curGen = genPerYear;
    let cumSavings = 0;

    for (let y = 1; y <= life; y++) {
      if (y > 1) curGen = curGen * (1 - degrade / 100);
      if (y > 1) curTariff = curTariff * (1 + escalation / 100);
      const selfUsedY = curGen * selfCons;
      const exportedY = Math.max(0, curGen - selfUsedY);
      const savingsY = selfUsedY * curTariff + exportedY * exportRate;
      cumSavings += savingsY;
      rows.push({ y, gen: curGen, savings: savingsY, cum: cumSavings });
    }

    setResult({
      systemSize: calculatedSystemSize,
      genPerYear,
      firstYearSavings,
      simplePayback,
      systemCost,
      rows,
    });
  };

  useEffect(() => {
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only calculate on initial mount

  const handleReset = () => {
    setMode("system");
    setSystemSize(5);
    setMonthlyConsumption(350);
    setTargetOffset(80);
    setSunHours(4.2);
    setPerf(0.78);
    setTariff(7.0);
    setCostPerKw(85000);
    setSelfCons(0.8);
    setExportRate(3);
    setEscalation(3);
    setLife(25);
    setCo2factor(0.82);
    setDegrade(0.5);
  };

  const handleExportCsv = () => {
    if (!result) {
      alert("দয়া করে প্রথমে \"হিসাব করুন\" চাপুন");
      return;
    }

    let csv = "Year,Generation_kWh,YearSavings_INR,CumulativeSavings_INR\n";
    result.rows.forEach((r) => {
      csv += `${r.y},${r.gen.toFixed(2)},${r.savings.toFixed(2)},${r.cum.toFixed(2)}\n`;
    });
    csv += `\nSystemSize_kW,${result.systemSize.toFixed(2)}\nSystemCost_INR,${result.systemCost.toFixed(2)}\nFirstYearSavings_INR,${result.firstYearSavings ? result.firstYearSavings.toFixed(2) : ""}`;

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sunsynchro_cashflow.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
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
                সানসিঙ্ক্রো — সোলার সেভিংস ক্যালকুলেটর
              </h1>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                রুফটপ সৌর সিস্টেমের বার্ষিক উৎপাদন, সাশ্রয়, পেয়ে-ব্যাক এবং CO₂
                হ্রাসের অনুমান করুন। ডিফল্ট মান পরিবর্তন করে আপনার সাইট বা কোট
                অনুযায়ী কাস্টমাইজ করুন।
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
                  ইনপুট প্যারামিটার
                </h3>
              </div>

              {/* Input Mode */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  ইনপুট মোড
                </label>
                <select
                  value={mode}
                  onChange={(e) =>
                    setMode(e.target.value as "system" | "consumption")
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-all hover:border-gray-300"
                >
                  <option value="system">সিস্টেম আকার জানি (kW)</option>
                  <option value="consumption">আমার মাসিক খরচ জানি (kWh)</option>
                </select>
              </div>

              {/* System Size Input */}
              {mode === "system" && (
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    সিস্টেম আকার (kW)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={systemSize}
                    onChange={(e) => setSystemSize(parseFloat(e.target.value) || 0)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") calculate();
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-all hover:border-gray-300"
                  />
                </div>
              )}

              {/* Consumption Input */}
              {mode === "consumption" && (
                <div className="mb-5 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      মাসিক বিদ্যুৎ ব্যবহার (kWh)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={monthlyConsumption}
                      onChange={(e) =>
                        setMonthlyConsumption(parseFloat(e.target.value) || 0)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") calculate();
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-all hover:border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      টার্গেট অফসেট (%) — আপনার বিলের কত অংশ সরিয়ে দিতে চান?
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      step="1"
                      value={targetOffset}
                      onChange={(e) =>
                        setTargetOffset(parseFloat(e.target.value) || 80)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") calculate();
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-all hover:border-gray-300"
                    />
                  </div>
                </div>
              )}

              {/* Sun Hours and Performance Ratio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    গড় সান-আওয়ার / kW / দিন
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.1"
                    value={sunHours}
                    onChange={(e) => setSunHours(parseFloat(e.target.value) || 4.2)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") calculate();
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-all hover:border-gray-300"
                  />
                  <span className="text-xs text-gray-500 mt-1 block">
                    (Tripura ডিফল্ট: 4.2 kWh/kW/দিন)
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    পারফরম্যান্স রেশিও
                  </label>
                  <input
                    type="number"
                    min="0.5"
                    max="0.95"
                    step="0.01"
                    value={perf}
                    onChange={(e) => setPerf(parseFloat(e.target.value) || 0.78)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") calculate();
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-all hover:border-gray-300"
                  />
                  <span className="text-xs text-gray-500 mt-1 block">
                    (ক্ষতি: ইনভার্টার, ওয়্যারিং, ময়লা)
                  </span>
                </div>
              </div>

              {/* Tariff and Cost per kW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    বিদ্যুতের হার (₹ / kWh)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={tariff}
                    onChange={(e) => setTariff(parseFloat(e.target.value) || 7.0)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") calculate();
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-all hover:border-gray-300"
                  />
                  <span className="text-xs text-gray-500 mt-1 block">
                    (Tripura ডিফল্ট: ₹7.0)
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    সিস্টেম খরচ (₹ / kW)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={costPerKw}
                    onChange={(e) =>
                      setCostPerKw(parseFloat(e.target.value) || 85000)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") calculate();
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-all hover:border-gray-300"
                  />
                </div>
              </div>

              {/* Self Consumption and Export Rate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    সেলফ-কনসাম্পশন
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    value={selfCons}
                    onChange={(e) => setSelfCons(parseFloat(e.target.value) || 0.8)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") calculate();
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-all hover:border-gray-300"
                  />
                  <span className="text-xs text-gray-500 mt-1 block">
                    (0–1) উদাহরণ: 0.8 → 80% অন-সাইট
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    এক্সপোর্ট ক্রেডিট (₹ / kWh)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={exportRate}
                    onChange={(e) => setExportRate(parseFloat(e.target.value) || 3)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") calculate();
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-all hover:border-gray-300"
                  />
                </div>
              </div>

              {/* Escalation and Life */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    বার্ষিক ট্যারিফ বৃদ্ধি (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={escalation}
                    onChange={(e) =>
                      setEscalation(parseFloat(e.target.value) || 3)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") calculate();
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-all hover:border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    প্যানেল আয়ু (বছর)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={life}
                    onChange={(e) => setLife(parseInt(e.target.value) || 25)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") calculate();
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-all hover:border-gray-300"
                  />
                </div>
              </div>

              {/* CO2 Factor and Degradation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    CO₂ ফ্যাক্টর (kg CO₂ / kWh)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={co2factor}
                    onChange={(e) =>
                      setCo2factor(parseFloat(e.target.value) || 0.82)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") calculate();
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-all hover:border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    সিস্টেম ডিগ্রেডেশন (% / বছর)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    value={degrade}
                    onChange={(e) => setDegrade(parseFloat(e.target.value) || 0.5)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") calculate();
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0ea5a4] focus:border-transparent transition-all hover:border-gray-300"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 items-center pt-4 border-t border-gray-200">
                <button
                  onClick={calculate}
                  className="px-6 py-3 bg-gradient-to-r from-[#0ea5a4] to-[#0d9493] text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all text-sm"
                >
                  হিসাব করুন
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all text-sm"
                >
                  রিসেট
                </button>
                <div className="ml-auto flex gap-2 print:hidden">
                  <button
                    onClick={handleExportCsv}
                    className="px-5 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all text-sm"
                  >
                    CSV এক্সপোর্ট
                  </button>
                  <button
                    onClick={handlePrint}
                    className="px-5 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all text-sm"
                  >
                    প্রিন্ট
                  </button>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    <strong>টিপ:</strong> নির্দিষ্ট কোটের জন্য ডিফল্ট মান পরিবর্তন করুন (সিস্টেম খরচ,
                    ট্যারিফ, সান-আওয়ার) — আরও সঠিক অনুমান পেতে।
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
                  ফলাফল
                </h3>
              </div>

              {result && (
                <div className="space-y-6">
                  <div>
                    <div className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">দ্রুত সারসংক্ষেপ</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                        <div className="font-bold text-gray-900 text-lg">
                          {format(result.genPerYear)} kWh
                        </div>
                        <div className="text-xs text-gray-600 mt-1 font-medium">
                          বার্ষিক আনুমানিক উৎপাদন
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                        <div className="font-bold text-gray-900 text-lg">
                          {format(result.firstYearSavings, true)}
                        </div>
                        <div className="text-xs text-gray-600 mt-1 font-medium">
                          প্রথম বছরের সাশ্রয়
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                        <div className="font-bold text-gray-900 text-lg">
                          {result.simplePayback === Infinity
                            ? "—"
                            : `${Number(result.simplePayback.toFixed(1))} yrs`}
                        </div>
                        <div className="text-xs text-gray-600 mt-1 font-medium">
                          সিম্পল পে-ব্যাক
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200">
                        <div className="font-bold text-gray-900 text-lg">
                          {format(result.genPerYear * co2factor)} kg
                        </div>
                        <div className="text-xs text-gray-600 mt-1 font-medium">
                          CO₂ এড়ানো (প্রথম বছর)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      25 বছরের ক্যাশফ্লো সারমারি
                    </label>
                    <div className="max-h-[400px] overflow-auto p-4 bg-gray-50 rounded-xl border-2 border-gray-200 font-mono text-xs">
                      <div className="whitespace-pre-wrap">
                        {(() => {
                          let txt =
                            "Year | Generation (kWh) | Year savings (₹) | Cumulative savings (₹)\n";
                          txt +=
                            "-------------------------------------------------------------\n";
                          result.rows.forEach((r) => {
                            txt +=
                              r.y.toString().padEnd(4) +
                              " | " +
                              r.gen.toFixed(0).padStart(9) +
                              " | " +
                              ("₹" +
                                Math.round(r.savings).toLocaleString("en-IN")
                              ).padStart(14) +
                              " | " +
                              ("₹" +
                                Math.round(r.cum).toLocaleString("en-IN")
                              ).padStart(17) +
                              "\n";
                          });
                          txt +=
                            "\nSystem size: " +
                            result.systemSize.toFixed(2) +
                            " kW | System cost: ₹" +
                            Math.round(result.systemCost).toLocaleString("en-IN");
                          return txt;
                        })()}
                      </div>
                    </div>
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
                    হিসাব করতে &apos;হিসাব করুন&apos; চাপুন
                  </p>
                </div>
              )}

              <footer className="mt-8 pt-6 border-t-2 border-gray-200">
                <div className="text-sm font-bold text-gray-900 mb-1">
                  সানসিঙ্ক্রো Pvt. Ltd.
                </div>
                <div className="text-xs text-gray-600 mb-3">
                  যোগাযোগ: 9742422340 | ওয়েব: sunsynchro.com
                </div>
                <div className="text-xs text-gray-500 leading-relaxed bg-gray-50 p-3 rounded-lg">
                  <strong>অনুমান:</strong> বার্ষিক উৎপাদন ≈ সিস্টেম আকার × সান-আওয়ার × 365 ×
                  পারফরম্যান্স রেশিও। সেলফ-কনসাম্পশন ট্যারিফকে প্রতিস্থাপন করে;
                  এক্সপোর্ট ক্ষেত্রের জন্য এক্সপোর্ট রেট ব্যবহার করা হয়। এটি একটি
                  আনুমানিক হিসাব, চূড়ান্ত ডিজাইন নয়।
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
