document.addEventListener('DOMContentLoaded', () => {
    // --- I18N TRANSLATIONS ---
    const translations = {
        en: {
            page_title: "LLM Fit: GPU Memory Calculator",
            main_header: "🧩 LLM Fit",
            subtitle: "Your LLM-to-GPU Sizing Tool",
            share: "🔗 Share",
            copied: "✅ Copied!",
            reset: "Reset",
            unlock: "Unlock",
            custom_model: "(Custom)",
            is_moe_model: "Mixture-of-Experts (MoE) Model",
            load_models_manually: "Running locally. Load models.json manually:",
            model_catalog: "Model Catalog",
            family: "Family",
            variant: "Variant",
            architecture: "Core Architecture",
            architecture_details: "Architectural Details (Reference)",
            layers_l: "Layers L", hidden_h: "Hidden H", heads_a: "Heads A", kv_heads: "KV Heads", ffn_multiplier: "FFN Multiplier", vocab_v: "Vocabulary V", tie_embeddings: "Tie Embeddings", context_window: "Context",
            moe_total_experts: "Total Experts", moe_active_experts: "Active Experts (Top-K)",
            norm_type: "Normalization", activation_fn: "Activation Fn", mlp_structure: "MLP Structure", pos_embedding: "Pos. Embedding",
            yes: "Yes", no: "No",
            description_tech: "Description & Technologies",
            model_notes_placeholder: "Select a model to see its description.",
            mode_and_params: "Mode & Calculation Parameters",
            training: "Training", inference: "Inference",
            precision: "Precision", precision_amp: "AMP (BF16 + FP32 master)", precision_bf16: "BF16/FP16", precision_fp32: "FP32", precision_qlora: "QLoRA (4-bit base)",
            optimizer: "Optimizer", optimizer_sgdm: "SGD w/ Momentum",
            dp_gpus: "Data Parallel GPUs", zero_0: "0 (Off)", zero_1: "1 (Opt.)", zero_2: "2 (+Grad)", zero_3: "3 (+Weights)",
            seq_len_s: "Sequence Length S", batch_per_gpu_b: "Batch per GPU B", full: "Full",
            weight_quantization: "Weight Quantization", kv_cache_quantization: "KV Cache Quantization", batch_size: "Batch Size",
            results: "Results", model_parameters: "Model Parameters", memory_per_gpu: "Memory per GPU",
            memory_breakdown: "Memory Breakdown",
            gpu_recommendations: "GPU Recommendations", gpu_rec_placeholder: "Results will be shown here.",
            rec_1: "✅ Suitable: RTX 3060 12GB, RTX 4060 Ti 16GB", rec_2: "✅ Suitable: RTX 4070 12GB, A4000 16GB", rec_3: "⚠️ Recommended: RTX 3090/4090 24GB, A5000 24GB", rec_4: "🔴 Required: A6000 48GB, A100 40GB", rec_5: "🔴 Required: A100 80GB or multiple GPUs with Model Parallelism",
            weights: "Model Weights", master_weights: "FP32 Master Weights (AMP)", gradients: "Gradients", optimizer_states: "Optimizer States", activations: "Activations", kv_cache: "KV Cache", buffers: "Buffers & Scratchpad",
            mem_per_sequence: "Memory per Sequence",
            moe_info: "This is a Mixture-of-Experts (MoE) model with {experts} experts, selecting the top {topK} per token."
        },
        ru: {
            page_title: "LLM Fit: Калькулятор памяти GPU",
            main_header: "🧩 LLM Fit",
            subtitle: "Ваш инструмент подбора GPU для LLM",
            share: "🔗 Поделиться",
            copied: "✅ Скопировано!",
            reset: "Сброс",
            unlock: "Изменить",
            custom_model: "(Custom)",
            is_moe_model: "Модель Mixture-of-Experts (MoE)",
            load_models_manually: "Локальный запуск. Загрузите models.json вручную:",
            model_catalog: "Каталог моделей",
            family: "Семейство", variant: "Вариант",
            architecture: "Базовая архитектура",
            architecture_details: "Детали архитектуры (справочно)",
            layers_l: "Слои L", hidden_h: "Скрытое H", heads_a: "Головы A", kv_heads: "KV головы", ffn_multiplier: "FFN множитель", vocab_v: "Словарь V", tie_embeddings: "Связать эмбеддинги", context_window: "Контекст",
            moe_total_experts: "Всего экспертов", moe_active_experts: "Активных экспертов (Top-K)",
            norm_type: "Нормализация", activation_fn: "Активация", mlp_structure: "Структура MLP", pos_embedding: "Поз. эмбеддинг",
            yes: "Да", no: "Нет",
            description_tech: "Описание и технологии",
            model_notes_placeholder: "Выберите модель, чтобы увидеть описание.",
            mode_and_params: "Режим и параметры расчета",
            training: "Обучение", inference: "Инференс",
            precision: "Точность", precision_amp: "AMP (веса BF16 + мастер FP32)", precision_bf16: "BF16/FP16", precision_fp32: "FP32", precision_qlora: "QLoRA (база 4-бит)",
            optimizer: "Оптимизатор", optimizer_sgdm: "SGD с моментом",
            dp_gpus: "Data Parallel GPU", zero_0: "0 (выкл.)", zero_1: "1 (Opt.)", zero_2: "2 (+Grad)", zero_3: "3 (+Weights)",
            seq_len_s: "Длина посл. S", batch_per_gpu_b: "Батч на GPU B", full: "Полный",
            weight_quantization: "Квантизация весов", kv_cache_quantization: "Квантизация KV кэша", batch_size: "Размер батча",
            results: "Результаты", model_parameters: "Параметры модели", memory_per_gpu: "Память на 1 GPU",
            memory_breakdown: "Детализация памяти",
            gpu_recommendations: "Рекомендации по GPU", gpu_rec_placeholder: "Результаты появятся здесь.",
            rec_1: "✅ Подойдет: RTX 3060 (12GB), RTX 4060 Ti (16GB)", rec_2: "✅ Подойдет: RTX 4070 (12GB), A4000 (16GB)", rec_3: "⚠️ Рекомендуется: RTX 3090/4090 (24GB), A5000 (24GB)", rec_4: "🔴 Требуется: A6000 (48GB), A100 (40GB)", rec_5: "🔴 Требуется: A100 (80GB) или несколько GPU с Model Parallelism",
            weights: "Веса модели", master_weights: "FP32 Мастер-веса (AMP)", gradients: "Градиенты", optimizer_states: "Состояния оптимизатора", activations: "Активации", kv_cache: "KV кэш", buffers: "Буферы и оверхед",
            mem_per_sequence: "Память на 1 посл.",
            moe_info: "Это модель Mixture-of-Experts (MoE) с {experts} экспертами, из которых выбираются {topK} лучших для каждого токена."
        }
    };

    // --- STATE & DOM ---
    let MODELS = [];
    let originalVariantState = {};
    let currentLang = 'en';
    let currentTheme = 'dark';
    const $ = s => document.querySelector(s);
    const $$ = s => document.querySelectorAll(s);

    const dom = {
        family: $('#family'), variant: $('#variant'),
        layers: $('#layers'), hidden: $('#hidden'), heads: $('#heads'), kvHeads: $('#kvHeads'), ffnMult: $('#ffnMult'), vocab: $('#vocab'), tieEmb: $('#tieEmb'), ctx: $('#ctx'),
        isMoE: $('#isMoE'),
        moeDetailsRow: $('#moe-details-row'), moeExperts: $('#moeExperts'), moeActiveExperts: $('#moeActiveExperts'),
        norm: $('#norm'), activation: $('#activation'), mlp: $('#mlp'), pos_embedding: $('#pos_embedding'),
        precisionTrain: $('#precisionTrain'), optimizer: $('#optimizer'), dp: $('#dp'), zero: $('#zero'), seqTrain: $('#seqTrain'), mbsz: $('#mbsz'), ckpt: $('#ckpt'), flash: $('#flash'),
        quant: $('#quant'), quantKV: $('#quantKV'), seqInfer: $('#seqInfer'), batchInfer: $('#batchInfer'),
        paramsTotal: $('#paramsTotal'), memPerGpu: $('#memPerGpu'), tableBody: $('#tableBody'), gpuRec: $('#gpu_recommendation'),
        modelNotes: $('#modelNotes'), modelLinks: $('#modelLinks'),
        tabs: { train: $('#tab-train'), infer: $('#tab-infer') },
        panes: { train: $('#pane-train'), infer: $('#pane-infer') },
        themeToggle: $('#theme-toggle'),
        langButtons: { en: $('#lang-en'), ru: $('#lang-ru') },
        localFileLoader: $('#local-file-loader'),
        modelFileInput: $('#model-file-input'),
        shareBtn: $('#share-btn'),
        modifyBtn: $('#modify-btn'),
    };

    // --- HELPERS ---
    const toGB = b => b / (1024 ** 3);
    const toMB = b => b / (1024 ** 2);
    const fmtGB = x => `${x.toFixed(2)} GB`;
    const fmtMB = x => `${x.toFixed(1)} MB`;
    const t = (key, lang = currentLang) => translations[lang][key] || key;
    const ACT_COEFF = 6;
    const ARCH_KEYS = [
        'layers','hidden','heads','kvHeads','ffnMult','vocab','tieEmb','ctx',
        'isMoE', 'moeExperts','moeActiveExperts','norm','activation','mlp','pos_embedding'
    ];
    const CORE_ARCH_KEYS = ['layers', 'hidden', 'heads', 'kvHeads', 'ffnMult', 'vocab'];
    const STATE_KEYS = [
        'family','variant', ...ARCH_KEYS,
        'precisionTrain','optimizer','dp','zero','seqTrain','mbsz','ckpt','flash',
        'quant','quantKV','seqInfer','batchInfer'
    ];

    function readVal(el) {
        if (!el) return null;
        if (el.type === 'checkbox') return el.checked;
        if (el.tagName === 'SELECT') return el.value;
        if (el.tagName === 'INPUT' && el.type === 'number') {
            return el.value === '' ? null : Number(el.value);
        }
        return el.value;
    }

    function isEqual(a, b) {
        if (a === null && b === null) return true;
        return String(a) === String(b);
    }

    // --- CORE LOGIC ---
    async function main() {
        setupTheme();
        setupLanguage();
        await loadModels();
        setupEventListeners();
        loadStateFromHash();
    }

    function finishInitialization() {
        setupUI();
        calculate();
    }

    async function loadModels() {
        if (window.location.protocol === 'file:') {
            dom.localFileLoader.style.display = 'block';
            return;
        }
        try {
            const response = await fetch('models.json');
            MODELS = await response.json();
            finishInitialization();
        } catch (error) {
            console.error("Failed to fetch models.json:", error);
            dom.localFileLoader.style.display = 'block';
            alert("Could not fetch model data. Please upload models.json manually.");
        }
    }

    function setupUI() {
        populateFamilies();
        updateVariants();
        applyVariant();
    }

    function setupEventListeners() {
        dom.modelFileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    MODELS = JSON.parse(e.target.result);
                    dom.localFileLoader.style.display = 'none';
                    finishInitialization();
                } catch (err) {
                    alert("Error parsing models.json: " + err.message);
                }
            };
            reader.readAsText(file);
        });

        Object.values(dom.langButtons).forEach(btn => btn.addEventListener('click', (e) => setLanguage(e.target.id.split('-')[1])));
        dom.themeToggle.addEventListener('click', toggleTheme);
        dom.family.addEventListener('change', () => { updateVariants(); applyVariant(); calculate(); saveStateToHash(); });
        dom.variant.addEventListener('change', () => { applyVariant(); calculate(); saveStateToHash(); });
        
        $$('input, select').forEach(el => {
            const handler = () => {
                if (el.id === 'isMoE') {
                    dom.moeDetailsRow.style.display = el.checked ? 'grid' : 'none';
                }
                if (ARCH_KEYS.includes(el.id)) {
                    updateButtonAndTitleState();
                }
                calculate();
            };
            el.addEventListener('change', handler);
            el.addEventListener('input', handler);
        });

        Object.values(dom.tabs).forEach(tab => tab.addEventListener('click', () => switchTab(tab.dataset.tab)));
        window.addEventListener('hashchange', loadStateFromHash);
        dom.shareBtn.addEventListener('click', shareState);
        dom.modifyBtn.addEventListener('click', handleModifyClick);
    }

    // --- THEME & LANGUAGE ---
    function applyTranslations() {
        document.documentElement.lang = currentLang;
        $$('[data-t]').forEach(el => {
            const key = el.dataset.t;
            if (key) el.textContent = t(key);
        });
        $$('[data-t-placeholder]').forEach(el => el.placeholder = t(el.dataset.tPlaceholder));
        if (MODELS.length > 0) {
            populateFamilies();
            updateVariants();
            applyVariant();
            calculate();
        }
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
        applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    }

    function setupTheme() {
        const savedTheme = localStorage.getItem('llm_fit_theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
    }

    // --- UI & STATE MANAGEMENT ---
    function populateFamilies() {
        const currentVal = dom.family.value;
        dom.family.innerHTML = MODELS.map(f => `<option value="${f.id}">${f.name}</option>`).join('');
        if ([...dom.family.options].some(o => o.value === currentVal)) dom.family.value = currentVal;
    }

    function updateVariants() {
        const fam = getFamily();
        if (!fam) return;
        const currentVal = dom.variant.value;
        dom.variant.innerHTML = fam.variants.map(v => `<option value="${v.id}">${v.name}</option>`).join('');
        if ([...dom.variant.options].some(o => o.value === currentVal)) dom.variant.value = currentVal;
    }

    function getFamily() { return MODELS.find(f => f.id === dom.family.value) || MODELS[0]; }
    function getVariant() {
        const fam = getFamily();
        return fam ? (fam.variants.find(v => v.id === dom.variant.value) || fam.variants[0]) : null;
    }

    function applyVariant() {
        const v = getVariant();
        if (!v) return;
        
        ARCH_KEYS.forEach(key => {
            if (dom[key] && key !== 'isMoE') {
                const value = v[key];
                dom[key].value = (value !== undefined && value !== null) ? value : '';
            }
        });

        dom.isMoE.checked = !!v.moe;
        if (v.moe) {
            dom.moeExperts.value = v.moe.experts_total ?? v.moe.experts ?? '';
            const active = (v.moe.topK != null) ? (Number(v.moe.topK) + Number(v.moe.shared ?? 0)) : '';
            dom.moeActiveExperts.value = active;
        } else {
            dom.moeExperts.value = '';
            dom.moeActiveExperts.value = '';
        }
        dom.moeDetailsRow.style.display = dom.isMoE.checked ? 'grid' : 'none';

        let notes = v.notes?.[currentLang] || getFamily().notes?.[currentLang] || '';
        if (v.moe && !notes.includes('Mixture-of-Experts')) {
            notes += ' ' + t('moe_info').replace('{experts}', v.moe.experts_total || v.moe.experts).replace('{topK}', v.moe.topK);
        }
        dom.modelNotes.textContent = notes;
        dom.modelLinks.innerHTML = getFamily().links?.map(l => `<a href='${l.href}' target='_blank' rel='noopener'>${l.t}</a>`).join(' • ') || '';
        
        originalVariantState = {};
        ARCH_KEYS.forEach(k => {
            if (dom[k]) originalVariantState[k] = readVal(dom[k]);
        });
        
        updateButtonAndTitleState();
    }

    function isArchModified() {
        const current = collectState();
        return ARCH_KEYS.some(k => !isEqual(current[k], originalVariantState[k]));
    }

    function updateButtonAndTitleState() {
        const v = getVariant();
        const modified = isArchModified();
        
        const option = dom.variant.options[dom.variant.selectedIndex];
        if (option) {
            if (modified) {
                if (!option.text.includes(t('custom_model'))) {
                    option.text += ` ${t('custom_model')}`;
                }
            } else {
                if (v) option.text = v.name;
            }
        }

        const isLocked = !!v?.paramsOnly && !dom.modifyBtn.dataset.unlocked;
        CORE_ARCH_KEYS.forEach(key => dom[key].readOnly = isLocked);

        if (v?.paramsOnly) {
            dom.modifyBtn.style.display = 'block';
            dom.modifyBtn.textContent = isLocked ? t('unlock') : t('reset');
        } else if (modified) {
            dom.modifyBtn.style.display = 'block';
            dom.modifyBtn.textContent = t('reset');
        } else {
            dom.modifyBtn.style.display = 'none';
        }
    }

    function handleModifyClick() {
        const v = getVariant();
        if (v?.paramsOnly) {
            const isLocked = CORE_ARCH_KEYS.some(key => dom[key].readOnly);
            if (isLocked) {
                CORE_ARCH_KEYS.forEach(key => { if (dom[key]) dom[key].readOnly = false; });
                dom.modifyBtn.dataset.unlocked = 'true';
            } else {
                delete dom.modifyBtn.dataset.unlocked;
                applyVariant();
            }
        } else {
            applyVariant();
        }
        updateButtonAndTitleState();
        calculate();
        saveStateToHash();
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
        const s = {};
        STATE_KEYS.forEach(k => {
            const el = dom[k];
            if (el) s[k] = readVal(el);
        });
        s.tab = document.querySelector('.tab-btn.active')?.dataset?.tab || 'train';
        s.lang = currentLang;
        return s;
    }

    function applyState(s) {
        if (!s) return;
        if (s.family && dom.family) dom.family.value = s.family;
        updateVariants();
        if (s.variant && dom.variant) dom.variant.value = s.variant;
        applyVariant();
        STATE_KEYS.forEach(k => {
            if (k === 'family' || k === 'variant') return;
            if (s[k] != null && dom[k]) {
                if (dom[k].type === 'checkbox') dom[k].checked = s[k];
                else dom[k].value = s[k];
            }
        });
        dom.moeDetailsRow.style.display = dom.isMoE.checked ? 'grid' : 'none';
        updateButtonAndTitleState();
        switchTab(s.tab || 'train');
        if (s.lang && s.lang !== currentLang) setLanguage(s.lang);
    }

    function saveStateToHash() {
        try {
            const state = collectState();
            const pruned = {};
            Object.entries(state).forEach(([k,v]) => {
                if (v === '' || v === null || typeof v === 'undefined' || v === false) return;
                pruned[k] = v;
            });
            const hash = btoa(JSON.stringify(pruned));
            history.replaceState(null, '', '#' + hash);
        } catch (e) {
            console.error("Failed to save state to hash:", e);
        }
    }

    function loadStateFromHash() {
        if (location.hash.length > 1) {
            try {
                const state = JSON.parse(atob(location.hash.slice(1)));
                applyState(state);
            } catch (e) { console.error("Failed to load state from hash:", e); }
        }
    }
    
    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    function shareState() {
        saveStateToHash();
        copyToClipboard(window.location.href);
        const originalText = dom.shareBtn.textContent;
        dom.shareBtn.textContent = t('copied');
        setTimeout(() => { dom.shareBtn.textContent = originalText; }, 1500);
    }

    // --- CALCULATIONS ---
    function bytesOf(dtype) {
        const map = { fp32: 4, bf16: 2, fp16: 2, amp: 2, int8: 1, int4: 0.5, int3: 0.375, int2: 0.25, q4lora: 0.55 };
        return map[dtype] || 2;
    }

    function calculateParameters(s) {
        const { layers: L, hidden: H, heads: A, kvHeads, ffnMult: fm, vocab: V, tieEmb, mlp, isMoE, moeExperts, moeActiveExperts } = s;
        if (![L, H, A, fm, V].every(x => typeof x === 'number' && x > 0)) {
            return { total: 0, active: 0 };
        }
        const AkEff = (typeof kvHeads === 'number' && kvHeads > 0) ? kvHeads : A;
        const kvRatio = AkEff / A;
        const attn = L * (H * H * (2 + 2 * kvRatio));
        const emb = V * H;
        const lmHead = (tieEmb === 'true' || tieEmb === true) ? 0 : V * H;
        const baseFfnPerLayer = (mlp === 'GatedMLP' ? 3 : 2) * fm * H * H;
        
        let E_total = 1, E_active = 1;
        if (isMoE) {
            E_total = (typeof moeExperts === 'number' && moeExperts > 0) ? moeExperts : 1;
            E_active = (typeof moeActiveExperts === 'number' && moeActiveExperts > 0) ? moeActiveExperts : E_total;
        }

        const ffn_total = L * E_total * baseFfnPerLayer;
        const ffn_active = L * E_active * baseFfnPerLayer;
        const total = attn + ffn_total + emb + lmHead;
        const active = attn + ffn_active + emb + lmHead;
        return { total, active };
    }

    function calcTrainingMemory(s) {
        const table = [];
        const { total: totalParams, active: activeParams } = calculateParameters(s);
        let weightBytes = bytesOf(s.precisionTrain), gradBytes = 2, actBytes = 2, masterBytes = 0, optBytes = 4, optStates = 0;
        if (s.precisionTrain === 'fp32') { gradBytes = 4; actBytes = 4; }
        if (s.precisionTrain === 'amp') { masterBytes = 4; }
        if (s.optimizer === 'adamw') optStates = 2; else if (s.optimizer === 'sgdm') optStates = 1;

        const D = Math.max(1, s.dp), zero = s.zero | 0;
        const partW = zero >= 3 ? 1 / D : 1, partG = zero >= 2 ? 1 / D : 1, partO = zero >= 1 ? 1 / D : 1;

        const mem = {};
        
        if (s.precisionTrain === 'q4lora') {
            mem.weights = totalParams * bytesOf('int4') * partW;
            mem.grads = 0; mem.optim = 0; mem.masterWeights = 0;
        } else {
            mem.weights = totalParams * weightBytes * partW;
            if (masterBytes > 0) mem.masterWeights = totalParams * masterBytes * (zero >= 1 ? 1 / D : 1);
            mem.grads = totalParams * gradBytes * partG;
            if (optStates > 0) mem.optim = totalParams * optBytes * optStates * partO;
        }

        const ckptFactor = s.ckpt === 'full' ? Math.max(2, Math.sqrt(s.layers)) : 1;
        let perSeqActivations = ACT_COEFF * s.layers * s.hidden * s.seqTrain * actBytes / ckptFactor;
        if (s.flash !== 'true') {
            perSeqActivations += s.layers * s.heads * s.seqTrain * s.seqTrain * actBytes;
        }
        mem.activations = perSeqActivations * s.mbsz;

        table.push([t('weights'), fmtGB(toGB(mem.weights))]);
        if (mem.masterWeights) table.push([t('master_weights'), fmtGB(toGB(mem.masterWeights))]);
        if (s.precisionTrain !== 'q4lora') {
            table.push([t('gradients'), fmtGB(toGB(mem.grads))]);
            if (mem.optim) table.push([`${t('optimizer_states')} (${s.optimizer.toUpperCase()})`, fmtGB(toGB(mem.optim))]);
        }
        table.push([t('activations'), fmtGB(toGB(mem.activations))]);
        table.push([t('mem_per_sequence'), fmtMB(toMB(perSeqActivations))]);

        const totalBytes = Object.values(mem).reduce((a, b) => a + (b || 0), 0);
        return { totalParams, activeParams, table, totalGB: toGB(totalBytes * 1.05) };
    }
    
    function getKvCacheBytes(s) {
        const v = getVariant();
        if (v && v.attention === 'MLA' && (v.kvDimMLA || v.mlaRopeKV)) {
            const headsEff = (typeof s.heads === 'number' && s.heads > 0) ? s.heads : 1;
            const elemsPerTok = Number(v.kvDimMLA || 0) + headsEff * Number(v.mlaRopeKV || 0);
            return s.layers * elemsPerTok * s.seqInfer * s.batchInfer * bytesOf(s.quantKV);
        }
        const headsEff = (typeof s.heads === 'number' && s.heads > 0) ? s.heads : 1;
        const kvHeadsEff = (typeof s.kvHeads === 'number' && s.kvHeads > 0) ? s.kvHeads : headsEff;
        const headDim = (typeof s.hidden === 'number' && s.hidden > 0) ? (s.hidden / headsEff) : 1;
        return 2 * s.layers * kvHeadsEff * headDim * s.seqInfer * s.batchInfer * bytesOf(s.quantKV);
    }

    function calcInferenceMemory(s) {
        const table = [];
        const { total: totalParams, active: activeParams } = calculateParameters(s);
        const mem = {};
        mem.weights = totalParams * bytesOf(s.quant);
        mem.kvCache = getKvCacheBytes(s);
        
        const bufFactor = (s.quant === 'int4' || s.quant === 'int8') ? 0.15 : 0.05;
        mem.buffers = mem.weights * bufFactor;

        table.push([t('weights'), fmtGB(toGB(mem.weights))]);
        table.push([t('kv_cache'), fmtGB(toGB(mem.kvCache))]);
        table.push([t('buffers'), fmtGB(toGB(mem.buffers))]);

        const totalBytes = Object.values(mem).reduce((a, b) => a + b, 0);
        return { totalParams, activeParams, table, totalGB: toGB(totalBytes * 1.05) };
    }

    function calculate() {
        if (MODELS.length === 0) return;
        const s = collectState();
        const mode = document.querySelector('.tab-btn.active').dataset.tab;
        const result = mode === 'train' ? calcTrainingMemory(s) : calcInferenceMemory(s);

        const totalB = (result.totalParams / 1e9).toFixed(2);
        const activeB = (result.activeParams / 1e9).toFixed(2);
        
        if (Math.abs(result.totalParams - result.activeParams) < 1e6) {
            dom.paramsTotal.innerHTML = `${totalB}B`;
        } else {
            dom.paramsTotal.innerHTML = `${totalB}B <span class="active-params">(${activeB}B active)</span>`;
        }

        dom.memPerGpu.textContent = fmtGB(result.totalGB);
        dom.tableBody.innerHTML = result.table.map(([name, val]) => `<tr><td>${name}</td><td>${val}</td></tr>`).join('');

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