// 股票mock数据
export interface Stock {
  code: string
  name: string
  fullName: string
}

export const stocksData: Stock[] = [
  { code: "2867", name: "三商壽", fullName: "三商壽(2867)" },
  { code: "2330", name: "台積電", fullName: "台積電(2330)" },
  { code: "2317", name: "鴻海", fullName: "鴻海(2317)" },
  { code: "2454", name: "聯發科", fullName: "聯發科(2454)" },
  { code: "2881", name: "富邦金", fullName: "富邦金(2881)" },
  { code: "2882", name: "國泰金", fullName: "國泰金(2882)" },
  { code: "2886", name: "兆豐金", fullName: "兆豐金(2886)" },
  { code: "2891", name: "中信金", fullName: "中信金(2891)" },
  { code: "2892", name: "第一金", fullName: "第一金(2892)" },
  { code: "2884", name: "玉山金", fullName: "玉山金(2884)" },
  { code: "2303", name: "聯電", fullName: "聯電(2303)" },
  { code: "2308", name: "台達電", fullName: "台達電(2308)" },
  { code: "2382", name: "廣達", fullName: "廣達(2382)" },
  { code: "2395", name: "研華", fullName: "研華(2395)" },
  { code: "3008", name: "大立光", fullName: "大立光(3008)" },
]

// 生成mock营收数据的函数
export const generateMockRevenueData = (stockCode: string) => {
  // 为不同股票生成不同的数据模式
  const baseRevenue = stockCode === "2330" ? 15000000 : stockCode === "2317" ? 12000000 : 8000000
  const volatility = stockCode === "2867" ? 0.3 : 0.15

  const generateData = (months: number) => {
    const data = []
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - months)

    for (let i = 0; i < months; i++) {
      const date = new Date(startDate)
      date.setMonth(date.getMonth() + i)

      const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
      const randomFactor = 1 + (Math.random() - 0.5) * volatility
      const revenue = Math.floor(baseRevenue * randomFactor)
      const growthRate = (Math.random() - 0.5) * 40 // -20% to +20%

      data.push({
        month: monthStr,
        revenue,
        growthRate: Number(growthRate.toFixed(2)),
      })
    }

    return data
  }

  return {
    近1年: generateData(12),
    近3年: generateData(36),
    近5年: generateData(60),
  }
}
