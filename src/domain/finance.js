/**
 * Financial Calculation Logic for Dropshipping Unit Economics
 */

function calculateMetrics({ sale, cogs, cpa, feesPct, fixed = 0 }) {
    const transactionFee = sale * (feesPct / 100);
    const totalVariableCost = cogs + cpa + transactionFee;
    const netProfit = sale - totalVariableCost;
    
    const margin = sale > 0 ? (netProfit / sale) * 100 : 0;
    
    // Break-even ROAS = Sale Price / (Sale Price - COGS - Fees)
    const grossProfit = sale - cogs - transactionFee;
    const breakEvenROAS = grossProfit > 0 ? sale / grossProfit : 0;

    return {
        netProfit,
        margin,
        breakEvenROAS,
        transactionFee,
        totalVariableCost
    };
}

// Export for Node (Jest) and check for browser context
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calculateMetrics };
}
