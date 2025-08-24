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
            custom_model: "(Custom)",
            is_moe_model: "Mixture-of-Experts (MoE) Model",
            load_models_manually: "Running locally. Load models/index.json manually:",
            model_select: "Model",
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
            custom_model: "(Custom)",
            is_moe_model: "Модель Mixture-of-Experts (MoE)",
            load_models_manually: "Локальный запуск. Загрузите models/index.json вручную:",
            model_select: "Модель",
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
    let MODELS = {};
    let originalModelState = {};
    let currentLang = 'en';
    let currentTheme = 'dark';
    const $ = s => document.querySelector(s);
    const $$ = s => document.querySelectorAll(s);

    const dom = {
        modelSelect: $('#model-select'),
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
        resetBtn: $('#reset-btn'),
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
    const STATE_KEYS = [
        'modelSelect', ...ARCH_KEYS,
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
        populateModelSelect();
        applyModel();
        calculate();
    }

    function parseConfig(id, config, meta) {
        const isMoE =
            (config.architectures?.[0] || '').toLowerCase().includes('moe') ||
            (config.num_local_experts ?? 0) > 1 ||
            (config.n_routed_experts ?? 0) > 0 ||
            (config.num_experts ?? 0) > 0;

        const ffnMult = (config.intermediate_size && config.hidden_size)
            ? (config.intermediate_size / config.hidden_size) : null;

        const parsed = {
            id: id,
            name: meta.name,
            family: meta.family,
            license: meta.license,
            notes: meta.notes,
            links: meta.links,

            layers: config.num_hidden_layers,
            hidden: config.hidden_size,
            heads: config.num_attention_heads,
            kvHeads: config.num_key_value_heads,
            ffnMult: ffnMult ? parseFloat(ffnMult.toFixed(2)) : null,
            vocab: config.vocab_size,
            ctx: config.max_position_embeddings,
            tieEmb: config.tie_word_embeddings,

            isMoE: isMoE,
            mlp: config.hidden_act === 'silu' ? 'GatedMLP' : 'StandardMLP',
            norm: config.rms_norm_eps ? 'RMSNorm' : 'LayerNorm',
            pos_embedding: 'RoPE', // Default
        };

        if (isMoE) {
            parsed.moeExperts =
                config.num_local_experts || config.num_experts ||
                ((config.n_routed_experts || 0) + (config.n_shared_experts || 0));
            
            const topK = config.num_experts_per_tok || config.experts_per_token || 0;
            parsed.moeShared = config.n_shared_experts || 0;
            // Active experts = topK routed experts + always-active shared experts
            parsed.moeActiveExperts = topK + parsed.moeShared;
            
            // The actual intermediate size for each expert's FFN
            parsed.moeInter = config.moe_intermediate_size || null;
            // Some models (like DeepSeek) have dense layers at the beginning
            parsed.moeDenseReplace = config.first_k_dense_replace || 0;
        }

        // Special case for DeepSeek's MLA attention for accurate KV cache calculation
        if ((config.model_type || '').startsWith('deepseek_') || ('kv_lora_rank' in config)) {
            parsed.attention = 'MLA';
            parsed.kvDimMLA = config.kv_lora_rank || null;
            parsed.mlaRopeKV = config.qk_rope_head_dim || null;
        }

        return parsed;
    }

    async function loadModels() {
        try {
            const indexResponse = await fetch('models/index.json');
            const modelIds = await indexResponse.json();

            const promises = modelIds.map(id => Promise.all([
                fetch(`models/${id}/config.json`).then(res => res.json()),
                fetch(`models/${id}/meta.json`).then(res => res.json())
            ]).then(([config, meta]) => {
                MODELS[id] = parseConfig(id, config, meta);
            }));

            await Promise.all(promises);
            finishInitialization();
        } catch (error) {
            console.error("Failed to fetch model data:", error);
            alert("Could not fetch model data. Check the `models` directory and `index.json`.");
        }
    }

    function setupEventListeners() {
        Object.values(dom.langButtons).forEach(btn => btn.addEventListener('click', (e) => setLanguage(e.target.id.split('-')[1])));
        dom.themeToggle.addEventListener('click', toggleTheme);
        dom.modelSelect.addEventListener('change', () => { applyModel(); calculate(); saveStateToHash(); });
        
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
        dom.resetBtn.addEventListener('click', () => { applyModel(); calculate(); saveStateToHash(); });
    }

    // --- THEME & LANGUAGE ---
    function applyTranslations() {
        document.documentElement.lang = currentLang;
        $$('[data-t]').forEach(el => {
            const key = el.dataset.t;
            if (key) el.textContent = t(key);
        });
        $$('[data-t-placeholder]').forEach(el => el.placeholder = t(el.dataset.tPlaceholder));
        if (Object.keys(MODELS).length > 0) {
            populateModelSelect();
            applyModel();
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
    function populateModelSelect() {
        const currentVal = dom.modelSelect.value;
        const modelGroups = {};
        Object.values(MODELS).forEach(m => {
            if (!modelGroups[m.family]) modelGroups[m.family] = [];
            modelGroups[m.family].push(m);
        });

        dom.modelSelect.innerHTML = Object.entries(modelGroups).map(([family, models]) => `
            <optgroup label="${family}">
                ${models.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
            </optgroup>
        `).join('');
        
        if ([...dom.modelSelect.options].some(o => o.value === currentVal)) {
            dom.modelSelect.value = currentVal;
        }
    }

    function getSelectedModel() {
        return MODELS[dom.modelSelect.value];
    }

    function applyModel() {
        const model = getSelectedModel();
        if (!model) return;
        
        Object.keys(model).forEach(key => {
            if (dom[key]) {
                const value = model[key];
                if (dom[key].type === 'checkbox') {
                    dom[key].checked = !!value;
                } else {
                    dom[key].value = (value !== undefined && value !== null) ? value : '';
                }
            }
        });
        
        dom.moeDetailsRow.style.display = dom.isMoE.checked ? 'grid' : 'none';
        dom.modelNotes.textContent = model.notes?.[currentLang] || model.notes?.['en'] || '';
        dom.modelLinks.innerHTML = model.links?.map(l => `<a href='${l.href}' target='_blank' rel='noopener'>${l.t}</a>`).join(' • ') || '';
        
        originalModelState = {};
        ARCH_KEYS.forEach(k => {
            if (dom[k]) originalModelState[k] = readVal(dom[k]);
        });
        
        updateButtonAndTitleState();
    }

    function isArchModified() {
        const current = collectState();
        return ARCH_KEYS.some(k => !isEqual(current[k], originalModelState[k]));
    }

    function updateButtonAndTitleState() {
        const modified = isArchModified();
        const option = dom.modelSelect.options[dom.modelSelect.selectedIndex];
        if (option) {
            const model = getSelectedModel();
            if (modified) {
                if (!option.text.includes(t('custom_model'))) {
                    option.text += ` ${t('custom_model')}`;
                }
            } else {
                if (model) option.text = model.name;
            }
        }
        dom.resetBtn.style.display = modified ? 'block' : 'none';
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
        if (s.modelSelect && dom.modelSelect) dom.modelSelect.value = s.modelSelect;
        applyModel();
        STATE_KEYS.forEach(k => {
            if (k === 'modelSelect') return;
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

    // --- START: MODIFIED CODE ---
    function calculateParameters(s) {
        const { layers: L, hidden: H, heads: A, kvHeads, ffnMult: fm, vocab: V, tieEmb, mlp, isMoE, moeExperts, moeActiveExperts } = s;
        const model = getSelectedModel() || {};
        
        if (!(L > 0 && H > 0 && A > 0 && V > 0)) {
            return { total: 0, active: 0 };
        }

        const AkEff = (typeof kvHeads === 'number' && kvHeads > 0) ? kvHeads : A;
        const kvRatio = AkEff / A;
        const attn = L * (H * H * (2 + 2 * kvRatio));
        const emb = V * H;
        const lmHead = (tieEmb === 'true' || tieEmb === true) ? 0 : V * H;
        const coeff = (mlp === 'GatedMLP' ? 3 : 2);

        let ffn_total = 0, ffn_active = 0;

        if (isMoE) {
            const E_total = (typeof moeExperts === 'number' && moeExperts > 0) ? moeExperts : 1;
            const E_active = (typeof moeActiveExperts === 'number' && moeActiveExperts > 0) ? moeActiveExperts : Math.min(1, E_total);

            if (model.moeInter) {
                // Case 1: Advanced MoE with specific expert size (Qwen3, DeepSeek)
                const perExpertParams = coeff * H * model.moeInter;
                const L_dense = Math.min(L, Number(model.moeDenseReplace || 0));
                const L_moe = Math.max(0, L - L_dense);
                const densePerLayerParams = (model.ffnMult ? coeff * model.ffnMult * H * H : 0);
                
                ffn_total  = (L_moe * E_total  * perExpertParams) + (L_dense * densePerLayerParams);
                ffn_active = (L_moe * E_active * perExpertParams) + (L_dense * densePerLayerParams);
            } else {
                // Case 2: Standard MoE where each expert is a full FFN (GPT-OSS)
                const ffnMultEff = (typeof fm === 'number' && fm > 0) ? fm : (model.ffnMult || 0);
                const baseFfnPerLayer = coeff * ffnMultEff * H * H;
                ffn_total = L * E_total * baseFfnPerLayer;
                ffn_active = L * E_active * baseFfnPerLayer;
            }
        } else {
            // Case 3: Dense model
            const ffnMultEff = (typeof fm === 'number' && fm > 0) ? fm : (model.ffnMult || 0);
            const perLayerParams = coeff * ffnMultEff * H * H;
            ffn_total = L * perLayerParams;
            ffn_active = ffn_total;
        }

        const total = attn + ffn_total + emb + lmHead;
        const active = attn + ffn_active + emb + lmHead;
        return { total, active };
    }
    // --- END: MODIFIED CODE ---

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
        const model = getSelectedModel();
        if (model?.attention === 'MLA' && (model.kvDimMLA || model.mlaRopeKV)) {
            const headsEff = (typeof s.heads === 'number' && s.heads > 0) ? s.heads : 1;
            const elemsPerTok = Number(model.kvDimMLA || 0) + headsEff * Number(model.mlaRopeKV || 0);
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
        if (Object.keys(MODELS).length === 0) return;
        const s = collectState();
        const mode = document.querySelector('.tab-btn.active').dataset.tab;
        const result = mode === 'train' ? calcTrainingMemory(s) : calcInferenceMemory(s);

        const totalB = (result.totalParams / 1e9).toFixed(2);
        const activeB = (result.activeParams / 1e9).toFixed(2);
        
        if (Math.abs(result.totalParams - result.activeParams) < 1e6 || result.activeParams === 0) {
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