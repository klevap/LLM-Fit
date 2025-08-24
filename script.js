document.addEventListener('DOMContentLoaded', () => {
    // --- I18N TRANSLATIONS ---
    const translations = {
        en: {
            page_title: "LLM Fit: GPU Memory Calculator",
            main_header: "🧩 LLM Fit",
            subtitle: "Your LLM-to-GPU Sizing Tool",
            download_config: "Download Config",
            upload_config: "Upload Config",
            upload_hint: "You can also upload a `config.json` from Hugging Face.",
            copied: "✅ Copied!",
            reset: "Reset",
            custom_model: "(Custom)",
            model_select: "Model",
            architecture: "Model Architecture",
            description_tech: "Description & Technologies",
            model_notes_placeholder: "Select a model to see its description.",
            mode_and_params: "Mode & Calculation Parameters",
            training: "Training", inference: "Inference",
            precision: "Precision", precision_amp: "AMP (BF16 + FP32 master)", precision_bf16: "BF16/FP16", precision_fp32: "FP32", precision_qlora: "QLoRA (4-bit base)",
            optimizer: "Optimizer", optimizer_sgdm: "SGD w/ Momentum",
            dp_gpus: "Data Parallel GPUs", zero_0: "0 (Off)", zero_1: "1 (Opt.)", zero_2: "2 (+Grad)", zero_3: "3 (+Weights)",
            seq_len_s: "Sequence Length S", batch_per_gpu_b: "Batch per GPU B", full: "Full",
            weight_quantization: "Weight Quantization", kv_cache_quantization: "KV Cache Quantization", batch_size: "Batch Size", context_window: "Context",
            results: "Results", model_parameters: "Model Parameters", memory_per_gpu: "Memory per GPU",
            memory_breakdown: "Memory Breakdown",
            gpu_recommendations: "GPU Recommendations", gpu_rec_placeholder: "Results will be shown here.",
            rec_1: "✅ Suitable: RTX 3060 12GB, RTX 4060 Ti 16GB", rec_2: "✅ Suitable: RTX 4070 12GB, A4000 16GB", rec_3: "⚠️ Recommended: RTX 3090/4090 24GB, A5000 24GB", rec_4: "🔴 Required: A6000 48GB, A100 40GB", rec_5: "🔴 Required: A100 80GB or multiple GPUs with Model Parallelism",
            weights: "Model Weights", master_weights: "FP32 Master Weights (AMP)", gradients: "Gradients", optimizer_states: "Optimizer States", activations: "Activations", kv_cache: "KV Cache", buffers: "Buffers & Scratchpad",
            mem_per_sequence: "Memory per Sequence",
        },
        ru: {
            page_title: "LLM Fit: Калькулятор памяти GPU",
            main_header: "🧩 LLM Fit",
            subtitle: "Ваш инструмент подбора GPU для LLM",
            download_config: "Скачать конфиг",
            upload_config: "Загрузить конфиг",
            upload_hint: "Также можно загрузить `config.json` с Hugging Face.",
            copied: "✅ Скопировано!",
            reset: "Сброс",
            custom_model: "(Custom)",
            model_select: "Модель",
            architecture: "Архитектура модели",
            description_tech: "Описание и технологии",
            model_notes_placeholder: "Выберите модель, чтобы увидеть описание.",
            mode_and_params: "Режим и параметры расчета",
            training: "Обучение", inference: "Инференс",
            precision: "Точность", precision_amp: "AMP (веса BF16 + мастер FP32)", precision_bf16: "BF16/FP16", precision_fp32: "FP32", precision_qlora: "QLoRA (база 4-бит)",
            optimizer: "Оптимизатор", optimizer_sgdm: "SGD с моментом",
            dp_gpus: "Data Parallel GPU", zero_0: "0 (выкл.)", zero_1: "1 (Opt.)", zero_2: "2 (+Grad)", zero_3: "3 (+Weights)",
            seq_len_s: "Длина посл. S", batch_per_gpu_b: "Батч на GPU B", full: "Полный",
            weight_quantization: "Квантизация весов", kv_cache_quantization: "Квантизация KV кэша", batch_size: "Размер батча", context_window: "Контекст",
            results: "Результаты", model_parameters: "Параметры модели", memory_per_gpu: "Память на 1 GPU",
            memory_breakdown: "Детализация памяти",
            gpu_recommendations: "Рекомендации по GPU", gpu_rec_placeholder: "Результаты появятся здесь.",
            rec_1: "✅ Подойдет: RTX 3060 (12GB), RTX 4060 Ti (16GB)", rec_2: "✅ Подойдет: RTX 4070 (12GB), A4000 (16GB)", rec_3: "⚠️ Рекомендуется: RTX 3090/4090 (24GB), A5000 (24GB)", rec_4: "🔴 Требуется: A6000 (48GB), A100 (40GB)", rec_5: "🔴 Требуется: A100 (80GB) или несколько GPU с Model Parallelism",
            weights: "Веса модели", master_weights: "FP32 Мастер-веса (AMP)", gradients: "Градиенты", optimizer_states: "Состояния оптимизатора", activations: "Активации", kv_cache: "KV кэш", buffers: "Буферы и оверхед",
            mem_per_sequence: "Память на 1 посл.",
        }
    };

    // --- STATE & DOM ---
    let MODELS = {};
    let currentArchitecture = [];
    let originalArchitecture = [];
    let currentLang = 'en';
    let currentTheme = 'dark';
    const $ = s => document.querySelector(s);
    const $$ = s => document.querySelectorAll(s);

    const dom = {
        modelSelect: $('#model-select'),
        architectureContainer: $('#architecture-container'),
        precisionTrain: $('#precisionTrain'), optimizer: $('#optimizer'), dp: $('#dp'), zero: $('#zero'), seqTrain: $('#seqTrain'), mbsz: $('#mbsz'), ckpt: $('#ckpt'), flash: $('#flash'),
        quant: $('#quant'), quantKV: $('#quantKV'), seqInfer: $('#seqInfer'), batchInfer: $('#batchInfer'),
        paramsTotal: $('#paramsTotal'), memPerGpu: $('#memPerGpu'), tableBody: $('#tableBody'), gpuRec: $('#gpu_recommendation'),
        modelNotes: $('#modelNotes'), modelLinks: $('#modelLinks'),
        tabs: { train: $('#tab-train'), infer: $('#tab-infer') },
        panes: { train: $('#pane-train'), infer: $('#pane-infer') },
        themeToggle: $('#theme-toggle'),
        langButtons: { en: $('#lang-en'), ru: $('#lang-ru') },
        resetBtn: $('#reset-btn'),
        downloadConfigBtn: $('#download-config-btn'),
        uploadConfigInput: $('#upload-config-input'),
    };

    // --- HELPERS ---
    const toGB = b => b / (1024 ** 3);
    const toMB = b => b / (1024 ** 2);
    const fmtGB = x => `${x.toFixed(2)} GB`;
    const fmtMB = x => `${x.toFixed(1)} MB`;
    const t = (key, lang = currentLang) => translations[lang][key] || key;
    const ACT_COEFF = 6;
    const pick = (...vals) => vals.find(v => v !== undefined && v !== null);
    const safeDiv = (a, b, dflt = 0) => (b ? a / b : dflt);

    // --- CORE LOGIC ---
    async function main() {
        setupTheme();
        setupLanguage();
        await loadModels();
        setupEventListeners();
    }

    function finishInitialization() {
        populateModelSelect();
        applyModel();
    }

    // --- PARSING & UI RENDERING ---
    function parseConfig(config) {
        // This function is designed to be robust and handle both the app's internal format
        // and standard Hugging Face config.json files.
        const arch = [];
        
        // Handle nested configs (e.g., Gemma 3) by defaulting to the root object.
        const textSource = config.text_config || config;
        
        const vocabSize = pick(textSource.vocab_size, config.vocab_size);
        const tieEmb = pick(textSource.tie_word_embeddings, config.tie_word_embeddings, false);

        const H = textSource.hidden_size;
        const L = textSource.num_hidden_layers;
        if (!H || !L) {
            console.error("Core parameters (hidden_size, num_hidden_layers) not found in config.", config);
            alert("Could not parse the model configuration. Essential parameters like 'hidden_size' or 'num_hidden_layers' are missing.");
            return []; // Return empty architecture if core params are missing
        }
        
        const headDim = pick(textSource.head_dim, 128);
        const A = pick(textSource.num_attention_heads, Math.max(1, Math.round(safeDiv(H, headDim, 1))));
        const kvHeads = pick(textSource.num_key_value_heads, A);

        // 1. Embedding Layer
        arch.push({ type: 'embedding', vocab: vocabSize, hidden: H });

        // 2. Vision Tower (if exists)
        if (config.vision_config) {
            const vc = config.vision_config;
            arch.push({
                type: 'vision_tower',
                count: vc.num_hidden_layers,
                hidden: vc.hidden_size,
                heads: vc.num_attention_heads,
                ffnMult: safeDiv(vc.intermediate_size, vc.hidden_size, 4),
                kvHeads: pick(vc.num_key_value_heads, vc.num_attention_heads),
                participateInKV: false
            });
        }

        // 3. Define layer properties
        const isMLA = (config.model_type || '').includes('deepseek') || (config.attention || '').toUpperCase() === 'MLA';
        const expertsTotal = pick(textSource.num_local_experts, textSource.num_experts, config.n_routed_experts);
        const expertsTopK = pick(textSource.num_experts_per_tok, config.experts_per_token, config.topk_group);
        const expertsShared = pick(textSource.n_shared_experts, 0);
        const isMoE = !!expertsTotal && expertsTotal > 1;

        const interDense = textSource.intermediate_size;
        const interMoE = pick(textSource.moe_intermediate_size, config.moe_intermediate_size);
        const ffnMult = isMoE ? safeDiv(interMoE ?? interDense, H, 4) : safeDiv(interDense, H, 4);

        const layerTypes = textSource.layer_types || Array(L).fill('full_attention');
        const slideWin = pick(textSource.sliding_window, config.sliding_window, null);

        // 4. Group all identical layer types together for a cleaner UI
        const layerGroups = {};

        for (const lt of layerTypes) {
            const blockTemplate = {
                type: 'attention_layer',
                layerType: lt,
                hidden: H,
                heads: A,
                kvHeads,
                ffnMult,
                isMoE,
                attentionKind: isMLA ? 'MLA' : 'STANDARD',
                windowLen: lt === 'sliding_attention' ? slideWin : null
            };
            if (isMoE) {
                blockTemplate.moeExperts = expertsTotal;
                blockTemplate.moeActiveExperts = (expertsTopK || 0) + (expertsShared || 0);
            }
            if (isMLA) {
                blockTemplate.mla = {
                    qRank: config.q_lora_rank,
                    kvRank: config.kv_lora_rank,
                    qkRope: config.qk_rope_head_dim,
                    vHeadDim: config.v_head_dim
                };
            }

            const groupKey = JSON.stringify(blockTemplate);
            if (layerGroups[groupKey]) {
                layerGroups[groupKey].count++;
            } else {
                layerGroups[groupKey] = { ...blockTemplate, count: 1 };
            }
        }
        arch.push(...Object.values(layerGroups));

        // 5. LM Head Layer
        arch.push({ type: 'lm_head', vocab: vocabSize, hidden: H, tieEmb });
        
        return arch;
    }

    function renderArchitectureUI() {
        const container = dom.architectureContainer;
        container.innerHTML = '';
        currentArchitecture.forEach((block, index) => {
            const blockDiv = document.createElement('fieldset');
            blockDiv.className = 'arch-block';
            blockDiv.dataset.index = index;

            let headerText = `${block.type.replace(/_/g, ' ')}`;
            if (block.count) headerText += ` (x${block.count})`;
            if (block.layerType) headerText += ` - <span>${block.layerType.replace('_', ' ')}</span>`;
            if (block.isMoE) headerText += ` <span>[MoE]</span>`;
            if (block.attentionKind === 'MLA') headerText += ` <span>[MLA]</span>`;

            const gridDiv = document.createElement('div');
            gridDiv.className = 'arch-grid';

            const createInput = (key, label, readOnly = false, sourceObj = block) => {
                const value = sourceObj[key];
                if (typeof value === 'undefined' || value === null || typeof value === 'boolean') return '';
                return `
                    <div class="arch-grid-item">
                        <label>${label}</label>
                        <input type="number" data-key="${key}" value="${value}" ${readOnly ? 'readonly' : ''}>
                    </div>
                `;
            };

            let fieldsHTML = '';
            switch (block.type) {
                case 'embedding':
                case 'lm_head':
                    fieldsHTML = createInput('vocab', 'Vocabulary') + createInput('hidden', 'Hidden H');
                    if (block.tieEmb) fieldsHTML += '<div class="arch-grid-item"><label>Tied Embeddings</label><input type="text" value="Yes" readonly></div>';
                    break;
                case 'vision_tower':
                case 'attention_layer':
                    fieldsHTML = createInput('count', 'Layers') + createInput('hidden', 'Hidden H') + createInput('heads', 'Heads A') + createInput('kvHeads', 'KV Heads') + createInput('ffnMult', 'FFN Mult');
                    if (block.windowLen) fieldsHTML += createInput('windowLen', 'Window', true);
                    if (block.isMoE) {
                        fieldsHTML += createInput('moeExperts', 'Total Experts') + createInput('moeActiveExperts', 'Active Exp.');
                    }
                    if (block.attentionKind === 'MLA' && block.mla) {
                        fieldsHTML += createInput('qRank', 'MLA Q Rank', true, block.mla) + createInput('kvRank', 'MLA KV Rank', true, block.mla);
                    }
                    break;
            }
            gridDiv.innerHTML = fieldsHTML;
            blockDiv.innerHTML = `<legend class="arch-block-header">${headerText}</legend>`;
            blockDiv.appendChild(gridDiv);
            container.appendChild(blockDiv);
        });

        $$('#architecture-container input:not([readonly])').forEach(el => {
            el.addEventListener('input', () => {
                updateArchitectureFromUI();
                updateButtonAndTitleState();
                calculate();
            });
        });
    }

    async function loadModels() {
        try {
            const indexResponse = await fetch('models/index.json');
            const modelIds = await indexResponse.json();
            const promises = modelIds.map(id =>
                Promise.all([
                    fetch(`models/${id}/config.json`).then(res => res.json()),
                    fetch(`models/${id}/meta.json`).then(res => res.json())
                ]).then(([config, meta]) => {
                    MODELS[id] = { id, config, meta };
                })
            );
            await Promise.all(promises);
            finishInitialization();
        } catch (error) {
            console.error("Failed to fetch model data:", error);
            alert("Could not fetch model data.");
        }
    }

    function setupEventListeners() {
        Object.values(dom.langButtons).forEach(btn => btn.addEventListener('click', (e) => setLanguage(e.target.id.split('-')[1])));
        dom.themeToggle.addEventListener('click', toggleTheme);
        dom.modelSelect.addEventListener('change', () => { applyModel(); });
        
        $$('input, select').forEach(el => {
            if (el.id.startsWith('upload')) return;
            el.addEventListener('change', calculate);
            el.addEventListener('input', calculate);
        });

        Object.values(dom.tabs).forEach(tab => tab.addEventListener('click', () => switchTab(tab.dataset.tab)));
        dom.resetBtn.addEventListener('click', () => { applyModel(); });
        dom.downloadConfigBtn.addEventListener('click', downloadConfig);
        dom.uploadConfigInput.addEventListener('change', uploadConfig);
    }

    // --- THEME & LANGUAGE ---
    function applyTranslations() {
        document.documentElement.lang = currentLang;
        $$('[data-t]').forEach(el => {
            const key = el.dataset.t;
            if (key) el.textContent = t(key);
        });
        $$('[data-t-placeholder]').forEach(el => el.placeholder = t(el.dataset.tPlaceholder));
        $$('[data-t-title]').forEach(el => {
            const key = el.dataset.tTitle;
            if(key) el.title = t(key);
        });
        if (Object.keys(MODELS).length > 0) {
            populateModelSelect();
            applyModel();
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
        setLanguage(savedLang || 'en');
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
        Object.entries(MODELS).forEach(([id, m]) => {
            const family = m.meta.family || 'Other';
            if (!modelGroups[family]) modelGroups[family] = [];
            modelGroups[family].push({ id, name: m.meta.name });
        });

        dom.modelSelect.innerHTML = Object.entries(modelGroups).map(([family, models]) => `
            <optgroup label="${family}">
                ${models.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
            </optgroup>
        `).join('');

        if ([...dom.modelSelect.options].some(o => o.value === currentVal)) {
            dom.modelSelect.value = currentVal;
        } else {
            dom.modelSelect.selectedIndex = 0;
        }
    }

    function getSelectedModelData() {
        return MODELS[dom.modelSelect.value];
    }

    function applyModel() {
        const modelData = getSelectedModelData();
        if (!modelData) return;
        
        currentArchitecture = parseConfig(modelData.config);
        originalArchitecture = JSON.parse(JSON.stringify(currentArchitecture));
        
        renderArchitectureUI();
        
        dom.modelNotes.textContent = modelData.meta.notes?.[currentLang] || modelData.meta.notes?.['en'] || '';
        dom.modelLinks.innerHTML = modelData.meta.links?.map(l => `<a href='${l.href}' target='_blank' rel='noopener'>${l.t}</a>`).join(' • ') || '';
        
        updateButtonAndTitleState();
        calculate();
    }
    
    function updateArchitectureFromUI() {
        $$('.arch-block').forEach(blockDiv => {
            const index = parseInt(blockDiv.dataset.index, 10);
            const block = currentArchitecture[index];
            blockDiv.querySelectorAll('input[data-key]').forEach(input => {
                const key = input.dataset.key;
                const value = Number(input.value);
                if (!isNaN(value)) {
                    if (key.includes('.')) { // Handle nested keys like mla.qRank
                        const [parent, child] = key.split('.');
                        if (block[parent]) block[parent][child] = value;
                    } else {
                        block[key] = value;
                    }
                }
            });
        });
    }
    function isArchModified() {
        return JSON.stringify(currentArchitecture) !== JSON.stringify(originalArchitecture);
    }

    function updateButtonAndTitleState() {
        const modified = isArchModified();
        const option = dom.modelSelect.options[dom.modelSelect.selectedIndex];
        if (option) {
            const modelData = getSelectedModelData();
            if (modified) {
                if (!option.text.includes(t('custom_model'))) {
                    option.text += ` ${t('custom_model')}`;
                }
            } else {
                if (modelData) option.text = modelData.meta.name;
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
    }

    function downloadConfig() {
        updateArchitectureFromUI();
        const jsonString = JSON.stringify(currentArchitecture, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${dom.modelSelect.value}-custom.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function uploadConfig(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const uploadedJson = JSON.parse(e.target.result);
                // The parseConfig function is robust enough to handle both formats
                const newArch = parseConfig(uploadedJson);

                if (Array.isArray(newArch) && newArch.length > 0) {
                    currentArchitecture = newArch;
                    originalArchitecture = JSON.parse(JSON.stringify(newArch)); // Set baseline for custom model
                    renderArchitectureUI();
                    
                    // Mark the current selection as a custom model
                    const option = dom.modelSelect.options[dom.modelSelect.selectedIndex];
                    if (option && !option.text.includes(t('custom_model'))) {
                         option.text += ` ${t('custom_model')}`;
                    }
                    updateButtonAndTitleState();
                    calculate();

                } else {
                    alert('Invalid or incomplete configuration file.');
                }
            } catch (err) {
                alert('Error parsing configuration file.');
                console.error(err);
            }
        };
        reader.readAsText(file);
        // Reset the input value to allow uploading the same file again
        event.target.value = '';
    }
    // --- CALCULATIONS ---
    function bytesOf(dtype) {
        const map = { fp32: 4, bf16: 2, fp16: 2, amp: 2, int8: 1, int4: 0.5, int3: 0.375, int2: 0.25, q4lora: 0.55 };
        return map[dtype] || 2;
    }

    function calculateParameters() {
        let total = 0, active = 0;
        const ffnCoeff = 3; // For SwiGLU/GeGLU activations

        for (const block of currentArchitecture) {
            const L = block.count || 1;
            const H = block.hidden || 0;
            const V = block.vocab || 0;
            const A = block.heads || 0;
            const kvHeads = block.kvHeads || A;
            const fmult = block.ffnMult || 0;
            const headDim = safeDiv(H, A);

            let blockTotal = 0, blockActive = 0;

            if (block.type === 'embedding') {
                blockTotal = V * H;
            } else if (block.type === 'lm_head') {
                if (!block.tieEmb) blockTotal = V * H;
            } else if (block.type === 'vision_tower' || block.type === 'attention_layer') {
                if (H > 0 && A > 0) {
                    let attnParams = 0;
                    if (block.attentionKind === 'MLA' && block.mla) {
                        const { qRank, kvRank, qkRope, vHeadDim } = block.mla;
                        attnParams = (H * qRank) + (H * kvRank * 2) + (A * vHeadDim * H);
                    } else {
                        attnParams = (H * A * headDim) + (H * kvHeads * headDim * 2) + (H * A * headDim);
                    }

                    const normParams = 2 * H;
                    let ffnTotalParams = 0, ffnActiveParams = 0;

                    if (block.isMoE) {
                        const routerParams = H * (block.moeExperts || 1);
                        const baseFfn = ffnCoeff * fmult * H * H;
                        ffnTotalParams = routerParams + baseFfn * (block.moeExperts || 1);
                        ffnActiveParams = routerParams + baseFfn * (block.moeActiveExperts || 1);
                    } else {
                        ffnTotalParams = ffnCoeff * fmult * H * H;
                        ffnActiveParams = ffnTotalParams;
                    }

                    blockTotal = L * (attnParams + ffnTotalParams + normParams);
                    blockActive = L * (attnParams + ffnActiveParams + normParams);
                }
            }
            total += blockTotal;
            active += (blockActive > 0 ? blockActive : blockTotal);
        }
        return { total, active };
    }

    function getKvCacheBytesGeneric(seqLen, batch, bytesPerEl) {
        let kvBytes = 0;
        for (const block of currentArchitecture) {
            if (block.type !== 'attention_layer' || block.participateInKV === false) continue;

            const L = block.count || 0;
            const H = block.hidden || 0;
            const A = block.heads || 1;
            const kvHeads = block.kvHeads || A;
            const headDim = safeDiv(H, A);
            const effSeq = block.windowLen ? Math.min(seqLen, block.windowLen) : seqLen;

            let perLayerBytes = 0;
            if (block.attentionKind === 'MLA' && block.mla) {
                perLayerBytes = (block.mla.qkRope + block.mla.vHeadDim) * A * effSeq * batch * bytesPerEl;
            } else {
                perLayerBytes = 2 * kvHeads * headDim * effSeq * batch * bytesPerEl;
            }
            kvBytes += L * perLayerBytes;
        }
        return kvBytes;
    }

    function calcTrainingMemory(s) {
        const table = [];
        const { total: totalParams, active: activeParams } = calculateParameters();
        const actBytes = (s.precisionTrain === 'fp32') ? 4 : 2;

        const mem = {};
        if (s.precisionTrain === 'q4lora') {
            mem.weights = totalParams * bytesOf('int4');
            const loraParams = totalParams * 0.02; // Assume 2% trainable params for LoRA
            mem.grads = loraParams * 2; // BF16 grads
            mem.optim = loraParams * 4 * 2; // AdamW states
        } else {
            const weightBytes = bytesOf(s.precisionTrain);
            const gradBytes = (s.precisionTrain === 'fp32') ? 4 : 2;
            const masterBytes = (s.precisionTrain === 'amp') ? 4 : 0;
            const optStates = (s.optimizer === 'adamw') ? 2 : (s.optimizer === 'sgdm' ? 1 : 0);
            
            const D = Math.max(1, s.dp), zero = s.zero | 0;
            const partW = zero >= 3 ? 1 / D : 1, partG = zero >= 2 ? 1 / D : 1, partO = zero >= 1 ? 1 / D : 1;

            mem.weights = totalParams * weightBytes * partW;
            if (masterBytes > 0) mem.masterWeights = totalParams * masterBytes * partO;
            mem.grads = activeParams * gradBytes * partG;
            if (optStates > 0) mem.optim = activeParams * 4 * optStates * partO;
        }

        let totalLayers = 0, maxHidden = 0;
        currentArchitecture.forEach(b => {
            if (b.type === 'attention_layer') {
                totalLayers += (b.count || 0);
                if (b.hidden > maxHidden) maxHidden = b.hidden;
            }
        });

        const ckptFactor = s.ckpt === 'full' ? Math.max(2, Math.sqrt(totalLayers)) : 1;
        const flashFactor = s.flash === 'true' ? 0.7 : 1.0;
        let perSeqActivations = ACT_COEFF * flashFactor * totalLayers * maxHidden * s.seqTrain * actBytes / ckptFactor;
        mem.activations = perSeqActivations * s.mbsz;
        mem.kvCache = getKvCacheBytesGeneric(s.seqTrain, s.mbsz, actBytes);

        table.push([t('weights'), fmtGB(toGB(mem.weights))]);
        if (mem.masterWeights) table.push([t('master_weights'), fmtGB(toGB(mem.masterWeights))]);
        if (mem.grads) table.push([t('gradients'), fmtGB(toGB(mem.grads))]);
        if (mem.optim) table.push([`${t('optimizer_states')} (${s.optimizer.toUpperCase()})`, fmtGB(toGB(mem.optim))]);
        table.push([t('activations'), fmtGB(toGB(mem.activations))]);
        table.push([t('kv_cache'), fmtGB(toGB(mem.kvCache))]);
        
        const totalBytes = Object.values(mem).reduce((a, b) => a + (b || 0), 0);
        return { totalParams, activeParams, table, totalGB: toGB(totalBytes * 1.05) };
    }

    function calcInferenceMemory(s) {
        const table = [];
        const { total: totalParams } = calculateParameters();
        const mem = {};
        mem.weights = totalParams * bytesOf(s.quant);
        mem.kvCache = getKvCacheBytesGeneric(s.seqInfer, s.batchInfer, bytesOf(s.quantKV));
        
        const bufFactor = (s.quant.startsWith('int')) ? 0.15 : 0.05;
        mem.buffers = mem.weights * bufFactor;

        table.push([t('weights'), fmtGB(toGB(mem.weights))]);
        table.push([t('kv_cache'), fmtGB(toGB(mem.kvCache))]);
        table.push([t('buffers'), fmtGB(toGB(mem.buffers))]);

        const totalBytes = Object.values(mem).reduce((a, b) => a + (b || 0), 0);
        return { totalParams, activeParams: 0, table, totalGB: toGB(totalBytes * 1.05) };
    }

    function collectState() {
        const s = {};
        const fields = ['precisionTrain','optimizer','dp','zero','seqTrain','mbsz','ckpt','flash','quant','quantKV','seqInfer','batchInfer'];
        fields.forEach(k => {
            const el = dom[k];
            if (el) s[k] = (el.type === 'number' ? Number(el.value) : el.value);
        });
        return s;
    }

    function calculate() {
        if (Object.keys(MODELS).length === 0 || currentArchitecture.length === 0) return;
        const s = collectState();
        const mode = document.querySelector('.tab-btn.active').dataset.tab;
        const result = mode === 'train' ? calcTrainingMemory(s) : calcInferenceMemory(s);

        const totalB = (result.totalParams / 1e9).toFixed(2);
        const activeB = (result.activeParams / 1e9).toFixed(2);
        
        if (Math.abs(result.totalParams - result.activeParams) < 1e6 || result.activeParams === 0 || mode === 'infer') {
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