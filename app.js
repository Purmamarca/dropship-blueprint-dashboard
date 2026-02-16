document.addEventListener('DOMContentLoaded', () => {
    const saleInput = document.getElementById('sale-price');
    const cogsInput = document.getElementById('cogs');
    const cpaInput = document.getElementById('cpa');
    const feesInput = document.getElementById('fees-pct');
    const fixedInput = document.getElementById('fixed-costs');
    
    const profitDisplay = document.getElementById('profit-val');
    const roasDisplay = document.getElementById('roas-val');
    const marginDisplay = document.getElementById('margin-val');

    function calculateFinances() {
        const sale = parseFloat(saleInput.value) || 0;
        const cogs = parseFloat(cogsInput.value) || 0;
        const cpa = parseFloat(cpaInput.value) || 0;
        const feesPct = (parseFloat(feesInput.value) || 0) / 100;
        const fixed = parseFloat(fixedInput.value) || 0;

        const transactionFee = sale * feesPct;
        const totalVariableCost = cogs + cpa + transactionFee;
        const netProfit = sale - totalVariableCost;
        
        const margin = sale > 0 ? (netProfit / sale) * 100 : 0;
        
        // Break-even ROAS = Revenue / (Revenue - Gross Profit) 
        // Or simply: Sale Price / (Sale Price - COGS - Fees)
        const grossProfit = sale - cogs - transactionFee;
        const breakEvenROAS = grossProfit > 0 ? sale / grossProfit : 0;

        // Update UI with animations
        animateValue(profitDisplay, netProfit, '$');
        animateValue(roasDisplay, breakEvenROAS, '', 'x');
        animateValue(marginDisplay, margin, '', '%');
        
        // Color coding
        profitDisplay.style.color = netProfit <= 0 ? '#f43f5e' : '#10b981';
        marginDisplay.style.color = margin <= 0 ? '#f43f5e' : '#10b981';
    }

    function animateValue(element, value, prefix = '', suffix = '') {
        const currentText = element.textContent.replace(/[^\d.-]/g, '');
        const start = parseFloat(currentText) || 0;
        const end = value;
        const duration = 500;
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = progress * (end - start) + start;
            
            element.textContent = `${prefix}${current.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}${suffix}`;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }

    // Add listeners
    [saleInput, cogsInput, cpaInput, feesInput, fixedInput].forEach(input => {
        input.addEventListener('input', calculateFinances);
    });

    // Initial calculation
    calculateFinances();
});
