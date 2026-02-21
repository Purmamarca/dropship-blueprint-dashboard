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
        const metrics = calculateMetrics({
            sale: parseFloat(saleInput.value) || 0,
            cogs: parseFloat(cogsInput.value) || 0,
            cpa: parseFloat(cpaInput.value) || 0,
            feesPct: parseFloat(feesInput.value) || 0,
            fixed: parseFloat(fixedInput.value) || 0
        });

        const { netProfit, breakEvenROAS, margin } = metrics;

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
