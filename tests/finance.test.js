const { calculateMetrics } = require('../src/domain/finance');

describe('Financial Logic Integration Tests', () => {
    
    test('Scenario 1: Profitable Sale', () => {
        const input = {
            sale: 49.99,
            cogs: 15.50,
            cpa: 15.00,
            feesPct: 2.9
        };
        
        const result = calculateMetrics(input);
        
        // Expected Net Profit: 49.99 - (15.50 + 15.00 + (49.99 * 0.029))
        // 49.99 - 31.94971 = 18.04029
        expect(result.netProfit).toBeCloseTo(18.04, 2);
        expect(result.margin).toBeCloseTo(36.08, 1);
        expect(result.breakEvenROAS).toBeCloseTo(1.51, 2);
    });

    test('Scenario 2: Break-even Logic', () => {
        // At break-even, the breakEvenROAS should result in 0 profit if CPA matches
        const sale = 100;
        const cogs = 50;
        const feesPct = 0; // Simplify for math
        const cpa = 50;
        
        const result = calculateMetrics({ sale, cogs, cpa, feesPct });
        expect(result.netProfit).toBe(0);
        expect(result.breakEvenROAS).toBe(2); // 100 / 50
    });

    test('Scenario 3: Negative Margin / Losing Money', () => {
        const input = {
            sale: 20,
            cogs: 10,
            cpa: 15, // CPA higher than gross profit
            feesPct: 0
        };
        
        const result = calculateMetrics(input);
        expect(result.netProfit).toBeLessThan(0);
        expect(result.margin).toBeLessThan(0);
    });

    test('Scenario 4: High Fee Environment', () => {
        const input = {
            sale: 100,
            cogs: 20,
            cpa: 10,
            feesPct: 10
        };
        const result = calculateMetrics(input);
        expect(result.transactionFee).toBe(10);
        expect(result.netProfit).toBe(60); // 100 - (20 + 10 + 10)
    });
});
