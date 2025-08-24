document.addEventListener('DOMContentLoaded', () => {
    // --- I18N TRANSLATIONS ---
    const translations = {
        en: {
            page_title: "LLM Fit: GPU Memory Calculator",
            main_header: "🧩 LLM Fit",
            subtitle: "Your LLM-to-GPU Sizing Tool",
            model_catalog: "Model Catalog",
            search_label: "Search families and variants",
            search_placeholder: "e.g., llama, mixtral, qwen2, gemma2",
            family: "Family",
            variant: "Variant",
            architecture: "Architecture of Selected Model",
            layers_l: "Layers L",
            hidden_h: "Hidden H",
            heads_a: "Heads A",
            kv_heads: "KV Heads",
            ffn_multiplier: "FFN Multiplier",
            vocab_v: "Vocabulary V",
            tie_embeddings: "Tie Embeddings",
            context_window: "Context, tokens",
            yes: "Yes",
            no: "No",
            description_tech: "Description & Technologies",
            model_notes_placeholder: "Brief description, attention mechanisms, RoPE, SWA, MoE, etc. will be shown here.",
            mode_and_params: "Mode & Calculation Parameters",
            training: "Training",
            inference: "Inference",
            precision: "Precision",
            precision_amp: "AMP (BF16 weights + FP32 master)",
            precision_bf16: "BF16 or FP16",
            precision_fp32: "FP32",
            precision_qlora: "QLoRA (4-bit base + LoRA)",
            optimizer: "Optimizer",
            optimizer_sgdm: "SGD with Momentum",
            dp_gpus: "Data Parallel GPUs",
            zero_0: "0 (Off)",
            zero_1: "1 (Optimizer Sharding)",
            zero_2: "2 (+ Gradient Sharding)",
            zero_3: "3 (+ Weight Sharding)",
            seq_len_s: "Sequence Length S",
            batch_per_gpu_b: "Batch per GPU B",
            full: "Full",
            enable_lora: "Enable LoRA",
            lora_rank: "Rank (r)",
            weight_quantization: "Weight Quantization",
            kv_cache_quantization: "KV Cache Quantization",
            batch_size: "Batch Size",
            results: "Results",
            model_parameters: "Model Parameters",
            memory_per_gpu: "Memory per GPU",
            memory_breakdown: "Memory Breakdown",
            total_with_overhead: "Total (5% overhead)",
            gpu_recommendations: "GPU Recommendations",
            gpu_rec_placeholder: "Will be populated automatically",
            rec_1: "✅ Suitable: RTX 3060 12GB, RTX 4060 Ti 16GB",
            rec_2: "✅ Suitable: RTX 4070 12GB, A4000 16GB",
            rec_3: "⚠️ Recommended: RTX 3090/4090 24GB, A5000 24GB",
            rec_4: "🔴 Required: A6000 48GB, A100 40GB",
            rec_5: "🔴 Required: A100 80GB or multiple GPUs with Model Parallelism",
            weights: "Model Weights",
            master_weights: "FP32 Master Weights (AMP)",
            gradients: "Gradients",
            optimizer_states: "Optimizer States",
            activations: "Activations",
            kv_cache: "KV Cache",
            buffers: "Buffers & Scratchpad"
        },
        ru: {
            page_title: "LLM Fit: Калькулятор памяти GPU",
            main_header: "🧩 LLM Fit",
            subtitle: "Ваш инструмент подбора GPU для LLM",
            model_catalog: "Каталог моделей",
            search_label: "Поиск по семействам и вариантам",
            search_placeholder: "Например, llama, mixtral, qwen2, gemma2",
            family: "Семейство",
            variant: "Вариант",
            architecture: "Архитектура выбранной модели",
            layers_l: "Слои L",
            hidden_h: "Скрытое H",
            heads_a: "Головы A",
            kv_heads: "KV головы",
            ffn_multiplier: "FFN множитель",
            vocab_v: "Словарь V",
            tie_embeddings: "Связать эмбеддинги",
            context_window: "Контекст, токены",
            yes: "Да",
            no: "Нет",
            description_tech: "Описание и технологии",
            model_notes_placeholder: "Здесь будет краткое описание, особенности внимания, RoPE, SWA, MoE и другое.",
            mode_and_params: "Режим и параметры расчета",
            training: "Обучение",
            inference: "Инференс",
            precision: "Точность",
            precision_amp: "AMP (веса BF16 + мастер FP32)",
            precision_bf16: "BF16 или FP16",
            precision_fp32: "FP32",
            precision_qlora: "QLoRA (база 4-бит + LoRA)",
            optimizer: "Оптимизатор",
            optimizer_sgdm: "SGD с моментом",
            dp_gpus: "Data Parallel GPU",
            zero_0: "0 (выключен)",
            zero_1: "1 (шардинг оптимизатора)",
            zero_2: "2 (+ шардинг градиентов)",
            zero_3: "3 (+ шардинг весов)",
            seq_len_s: "Длина последовательности S",
            batch_per_gpu_b: "Батч на GPU B",
            full: "Полный",
            enable_lora: "Включить LoRA",
            lora_rank: "Ранг (r)",
            weight_quantization: "Квантизация весов",
            kv_cache_quantization: "Квантизация KV кэша",
            batch_size: "Размер батча",
            results: "Результаты",
            model_parameters: "Параметры модели",
            memory_per_gpu: "Память на 1 GPU",
            memory_breakdown: "Детализация памяти",
            total_with_overhead: "Итого (с оверхедом 5%)",
            gpu_recommendations: "Рекомендации по GPU",
            gpu_rec_placeholder: "Заполнится автоматически",
            rec_1: "✅ Подойдет: RTX 3060 (12GB), RTX 4060 Ti (16GB)",
            rec_2: "✅ Подойдет: RTX 4070 (12GB), A4000 (16GB)",
            rec_3: "⚠️ Рекомендуется: RTX 3090/4090 (24GB), A5000 (24GB)",
            rec_4: "🔴 Требуется: A6000 (48GB), A100 (40GB)",
            rec_5: "🔴 Требуется: A100 (80GB) или несколько GPU с Model Parallelism",
            weights: "Веса модели",
            master_weights: "FP32 Мастер-веса (AMP)",
            gradients: "Градиенты",
            optimizer_states: "Состояния оптимизатора",
            activations: "Активации",
            kv_cache: "KV кэш",
            buffers: "Буферы и оверхед"
        }
    };

    // --- STATE & DOM ---
    let MODELS = [];
    let currentLang = 'en';
    let currentTheme = 'dark';
    const $ = s => document.querySelector(s);
    const $$ = s => document.querySelectorAll(s);

    const dom = {
        family: $('#family'), variant: $('#variant'), search: $('#search'),
        layers: $('#layers'), hidden: $('#hidden'), heads: $('#heads'), kvHeads: $('#kvHeads'), ffnMult: $('#ffnMult'), vocab: $('#vocab'), tieEmb: $('#tieEmb'), ctx: $('#ctx'),
        precisionTrain: $('#precisionTrain'), optimizer: $('#optimizer'), dp: $('#dp'), zero: $('#zero'), seqTrain: $('#seqTrain'), mbsz: $('#mbsz'), ckpt: $('#ckpt'), flash: $('#flash'),
        loraEnabled: $('#loraEnabled'), loraR: $('#loraR'),
        quant: $('#quant'), quantKV: $('#quantKV'), seqInfer: $('#seqInfer'), batchInfer: $('#batchInfer'),
        paramsTotal: $('#paramsTotal'), memPerGpu: $('#memPerGpu'), tableBody: $('#tableBody'), sumWithOv: $('#sumWithOv'), gpuRec: $('#gpu_recommendation'),
        modelNotes: $('#modelNotes'), modelLinks: $('#modelLinks'),
        tabs: { train: $('#tab-train'), infer: $('#tab-infer') },
        panes: { train: $('#pane-train'), infer: $('#pane-infer') },
        themeToggle: $('#theme-toggle'),
        langButtons: { en: $('#lang-en'), ru: $('#lang-ru') }
    };

    // --- HELPERS ---
    const toGB = b => b / (1024 ** 3);
    const fmtGB = x => `${x.toFixed(2)} GB`;
    const t = (key, lang = currentLang) => translations[lang][key] || key;

    // --- CORE LOGIC ---
    async function main() {
        await loadModels();
        setupTheme();
        setupLanguage();
        setupUI();
        setupEventListeners();
        loadStateFromHash();
        calculate();
    }

    async function loadModels() {
        try {
            const response = await fetch('models.json');
            MODELS = await response.json();
        } catch (error) {
            console.error("Failed to load models.json:", error);
            alert("Could not load model data. Please check the console for errors.");
        }
    }

    function setupUI() {
        populateFamilies();
        updateVariants();
        applyVariant();
    }

    function setupEventListeners() {
        Object.values(dom.langButtons).forEach(btn => btn.addEventListener('click', (e) => setLanguage(e.target.id.split('-')[1])));
        dom.themeToggle.addEventListener('click', toggleTheme);
        dom.family.addEventListener('change', () => { updateVariants(); applyVariant(); calculate(); saveStateToHash(); });
        dom.variant.addEventListener('change', () => { applyVariant(); calculate(); saveStateToHash(); });
        dom.search.addEventListener('input', () => { /* Future feature: filter catalog */ });
        $$('input, select').forEach(el => {
            el.addEventListener('change', () => { calculate(); saveStateToHash(); });
            el.addEventListener('input', () => { if (el.type === 'number') calculate(); });
        });
        Object.values(dom.tabs).forEach(tab => tab.addEventListener('click', () => switchTab(tab.dataset.tab)));
        window.addEventListener('hashchange', loadStateFromHash);
    }

    // --- THEME & LANGUAGE ---
    function applyTranslations() {
        document.documentElement.lang = currentLang;
        $$('[data-t]').forEach(el => {
            const key = el.dataset.t;
            el.textContent = t(key);
        });
        $$('[data-t-placeholder]').forEach(el => {
            const key = el.dataset.tPlaceholder;
            el.placeholder = t(key);
        });
        populateFamilies();
        updateVariants();
        calculate();
    }

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('llm_fit_lang', lang);
        Object.values(dom.langButtons).forEach(btn => btn.classList.remove('active'));
        dom.langButtons[lang].classList.add('active');
        applyTranslations();
    }

    function setupLanguage() {
        const savedLang = localStorage.getItem('llm_fit_lang');
        const lang = savedLang || 'en';
        setLanguage(lang);
    }

    function applyTheme(theme) {
        currentTheme = theme;
        document.body.classList.toggle('light-theme', theme === 'light');
        dom.themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
        localStorage.setItem('llm_fit_theme', theme);
    }

    function toggleTheme() {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    }

    function setupTheme() {
        const savedTheme = localStorage.getItem('llm_fit_theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        applyTheme(theme);
    }

    // --- UI & STATE MANAGEMENT ---
    function populateFamilies() {
        const currentVal = dom.family.value;
        dom.family.innerHTML = MODELS.map(f => `<option value="${f.id}">${f.name}</option>`).join('');
        if ([...dom.family.options].some(o => o.value === currentVal)) {
            dom.family.value = currentVal;
        }
    }

    function updateVariants() {
        const fam = getFamily();
        if (!fam) return;
        const currentVal = dom.variant.value;
        dom.variant.innerHTML = fam.variants.map(v => `<option value="${v.id}">${v.name}</option>`).join('');
        if ([...dom.variant.options].some(o => o.value === currentVal)) {
            dom.variant.value = currentVal;
        }
    }

    function getFamily() { return MODELS.find(f => f.id === dom.family.value) || MODELS[0]; }
    function getVariant() {
        const fam = getFamily();
        return fam ? (fam.variants.find(v => v.id === dom.variant.value) || fam.variants[0]) : null;
    }

    function applyVariant() {
        const fam = getFamily();
        const v = getVariant();
        if (!fam || !v) return;
        dom.layers.value = v.layers;
        dom.hidden.value = v.hidden;
        dom.heads.value = v.heads;
        dom.kvHeads.value = v.kvHeads || v.heads;
        dom.ffnMult.value = v.ffnMult;
        dom.vocab.value = v.vocab;
        dom.tieEmb.value = String(v.tieEmb);
        dom.ctx.value = v.ctx;
        dom.modelNotes.textContent = v.notes?.[currentLang] || fam.notes?.[currentLang] || '';
        dom.modelLinks.innerHTML = fam.links?.map(l => `<a href='${l.href}' target='_blank' rel='noopener'>${l.t}</a>`).join(' • ') || '';
    }

    function switchTab(tab) {
        Object.values(dom.tabs).forEach(t => t.classList.remove('active'));
        Object.values(dom.panes).forEach(p => p.style.display = 'none');
        dom.tabs[tab].classList.add('active');
        dom.panes[tab].style.display = 'block';
        calculate();
        saveStateToHash();
    }

    function collectState() {
        return {
            family: dom.family.value, variant: dom.variant.value,
            layers: +dom.layers.value, hidden: +dom.hidden.value, heads: +dom.heads.value, kvHeads: +dom.kvHeads.value, ffnMult: +dom.ffnMult.value, vocab: +dom.vocab.value, tieEmb: dom.tieEmb.value === 'true',
            precisionTrain: dom.precisionTrain.value, optimizer: dom.optimizer.value, dp: +dom.dp.value, zero: +dom.zero.value, seqTrain: +dom.seqTrain.value, mbsz: +dom.mbsz.value, ckpt: dom.ckpt.value, flash: dom.flash.value === 'true',
            loraEnabled: dom.loraEnabled.value, loraR: +dom.loraR.value,
            quant: dom.quant.value, quantKV: dom.quantKV.value, seqInfer: +dom.seqInfer.value, batchInfer: +dom.batchInfer.value,
            tab: document.querySelector('.tab-btn.active')?.dataset?.tab || 'train',
            lang: currentLang
        };
    }

    function applyState(s) {
        if (!s) return;
        dom.family.value = s.family || MODELS[0].id;
        updateVariants();
        dom.variant.value = s.variant || getFamily().variants[0].id;
        dom.layers.value = s.layers; dom.hidden.value = s.hidden; dom.heads.value = s.heads; dom.kvHeads.value = s.kvHeads; dom.ffnMult.value = s.ffnMult; dom.vocab.value = s.vocab; dom.tieEmb.value = String(s.tieEmb);
        dom.precisionTrain.value = s.precisionTrain; dom.optimizer.value = s.optimizer; dom.dp.value = s.dp; dom.zero.value = s.zero; dom.seqTrain.value = s.seqTrain; dom.mbsz.value = s.mbsz; dom.ckpt.value = s.ckpt; dom.flash.value = String(s.flash);
        dom.loraEnabled.value = s.loraEnabled; dom.loraR.value = s.loraR;
        dom.quant.value = s.quant; dom.quantKV.value = s.quantKV; dom.seqInfer.value = s.seqInfer; dom.batchInfer.value = s.batchInfer;
        applyVariant();
        switchTab(s.tab || 'train');
        if (s.lang && s.lang !== currentLang) setLanguage(s.lang);
    }

    function saveStateToHash() {
        try {
            const state = collectState();
            const hash = btoa(JSON.stringify(state));
            history.replaceState(null, '', '#' + hash);
        } catch (e) { console.error("Failed to save state to hash:", e); }
    }

    function loadStateFromHash() {
        if (location.hash.length > 1) {
            try {
                const state = JSON.parse(atob(location.hash.slice(1)));
                applyState(state);
            } catch (e) { console.error("Failed to load state from hash:", e); }
        }
    }

    // --- CALCULATIONS ---
    function bytesOf(dtype) {
        const map = { fp32: 4, bf16: 2, fp16: 2, amp: 2, int8: 1, int4: 0.5, int3: 0.375, int2: 0.25, q4lora: 0.55 };
        return map[dtype] || 2;
    }

    function calcParams(s) {
        const { layers: L, hidden: H, heads: A, kvHeads: Ak, ffnMult: fm, vocab: V, tieEmb } = s;
        const kvRatio = Math.max(1, Ak) / Math.max(1, A);
        const attn = L * (H * H * (2 + 2 * kvRatio)); // Q, O (H*H) + K, V (H*H*kvRatio)
        const ffn = L * (3 * fm * H * H); // SwiGLU approx.
        const emb = V * H;
        const lmHead = tieEmb ? 0 : V * H;
        return attn + ffn + emb + lmHead;
    }

    function calcTrainingMemory(s) {
        const table = [];
        const totalParams = calcParams(s);
        let weightBytes = bytesOf(s.precisionTrain), gradBytes = 2, actBytes = 2, masterBytes = 0, optBytes = 4, optStates = 0;
        if (s.precisionTrain === 'fp32') { gradBytes = 4; actBytes = 4; }
        if (s.precisionTrain === 'amp') { masterBytes = 4; }
        if (s.optimizer === 'adamw') optStates = 2; else if (s.optimizer === 'sgdm') optStates = 1;

        const D = Math.max(1, s.dp), zero = s.zero | 0;
        const partW = zero >= 3 ? 1 / D : 1, partG = zero >= 2 ? 1 / D : 1, partO = zero >= 1 ? 1 / D : 1, partM = zero >= 3 ? 1 / D : 1;

        const isLora = s.loraEnabled === 'on';
        const loraParams = isLora ? (2 * s.layers * s.hidden * s.loraR * 2) : 0; // Simplified: Q,V
        const trainParams = isLora ? loraParams : totalParams;
        const frozenParams = isLora ? totalParams : 0;

        const mem = {};
        mem.weights = (frozenParams * bytesOf(s.precisionTrain === 'q4lora' ? 'q4lora' : 'fp16')) + (isLora ? 0 : (trainParams * weightBytes * partW));
        if (masterBytes > 0 && !isLora) mem.masterWeights = totalParams * masterBytes * partM;
        mem.grads = trainParams * gradBytes * partG;
        if (optStates > 0) mem.optim = trainParams * optBytes * optStates * partO;

        const ckptFactor = s.ckpt === 'full' ? 1 : 24; // Heuristic
        mem.activations = s.layers * s.hidden * s.seqTrain * s.mbsz * actBytes / ckptFactor;
        if (!s.flash) mem.activations += s.layers * s.heads * s.seqTrain * s.seqTrain * s.mbsz * actBytes;

        table.push([t('weights'), toGB(mem.weights)]);
        if (mem.masterWeights) table.push([t('master_weights'), toGB(mem.masterWeights)]);
        table.push([t('gradients'), toGB(mem.grads)]);
        if (mem.optim) table.push([`${t('optimizer_states')} (${s.optimizer.toUpperCase()})`, toGB(mem.optim)]);
        table.push([t('activations'), toGB(mem.activations)]);

        const totalBytes = Object.values(mem).reduce((a, b) => a + (b || 0), 0);
        return { totalParams, table, totalGB: toGB(totalBytes * 1.05) };
    }

    function calcInferenceMemory(s) {
        const table = [];
        const totalParams = calcParams(s);
        const mem = {};
        mem.weights = totalParams * bytesOf(s.quant);
        const kvCacheBytes = 2 * s.layers * s.kvHeads * (s.hidden / s.heads) * s.seqInfer * s.batchInfer * bytesOf(s.quantKV);
        mem.kvCache = kvCacheBytes;
        mem.buffers = mem.weights * 0.05; // Scratchpad, activations etc.

        table.push([t('weights'), toGB(mem.weights)]);
        table.push([t('kv_cache'), toGB(mem.kvCache)]);
        table.push([t('buffers'), toGB(mem.buffers)]);

        const totalBytes = Object.values(mem).reduce((a, b) => a + b, 0);
        return { totalParams, table, totalGB: toGB(totalBytes * 1.05) };
    }

    function calculate() {
        const s = collectState();
        const mode = document.querySelector('.tab-btn.active').dataset.tab;
        const result = mode === 'train' ? calcTrainingMemory(s) : calcInferenceMemory(s);

        dom.paramsTotal.textContent = `${(result.totalParams / 1e9).toFixed(2)}B`;
        dom.memPerGpu.textContent = fmtGB(result.totalGB);
        dom.tableBody.innerHTML = result.table.map(([name, gb]) => `<tr><td>${name}</td><td>${fmtGB(gb)}</td></tr>`).join('');
        dom.sumWithOv.textContent = fmtGB(result.totalGB);

        const g = result.totalGB;
        let recKey = '';
        if (g <= 10) recKey = 'rec_1';
        else if (g <= 16) recKey = 'rec_2';
        else if (g <= 24) recKey = 'rec_3';
        else if (g <= 48) recKey = 'rec_4';
        else recKey = 'rec_5';
        dom.gpuRec.innerHTML = `<strong>${t('gpu_recommendations')}</strong><br>${t(recKey)}`;
    }

    // --- INITIALIZATION ---
    main();
});