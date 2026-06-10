// ============================================
// SCRIPT PRINCIPAL - ECOCOLHEITA
// Funcionalidades: Calculadora de Desperdício + Acessibilidade
// ============================================

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== FUNCIONALIDADE PRINCIPAL: CALCULADORA DE DESPERDÍCIO =====
    const inputDesperdicio = document.getElementById('desperdicio');
    const botaoCalcular = document.getElementById('calcularBtn');
    
    // Elementos onde os resultados serão exibidos
    const aguaResultado = document.getElementById('aguaResultado');
    const co2Resultado = document.getElementById('co2Resultado');
    const pessoasResultado = document.getElementById('pessoasResultado');
    
    // Fatores de conversão (valores médios baseados em dados reais)
    // 1kg de alimento desperdiçado = 1000 litros de água (considerando toda a cadeia)
    // 1kg de alimento desperdiçado = 2kg de CO₂ emitido
    // 1kg de alimento desperdiçado = alimenta 1 pessoa por dia (considerando 300g/refeição)
    const AGUA_POR_KG = 1000;      // litros
    const CO2_POR_KG = 2;          // kg
    const PESSOAS_POR_KG_DIA = 1;   // 1 pessoa por dia com 1kg de alimento
    
    // Função que calcula o impacto com base no desperdício semanal
    function calcularImpacto(kgPorSemana) {
        if (kgPorSemana <= 0) {
            return { agua: 0, co2: 0, pessoas: 0 };
        }
        
        // Calcula o desperdício anual (52 semanas)
        const kgPorAno = kgPorSemana * 52;
        
        // Aplica os fatores de conversão
        const agua = kgPorAno * AGUA_POR_KG;
        const co2 = kgPorAno * CO2_POR_KG;
        const pessoas = kgPorAno * PESSOAS_POR_KG_DIA;
        
        return {
            agua: Math.round(agua),
            co2: Math.round(co2),
            pessoas: Math.round(pessoas)
        };
    }
    
    // Função que atualiza a interface com os resultados
    function atualizarResultados(kgPorSemana) {
        const impacto = calcularImpacto(kgPorSemana);
        
        // Formata números grandes com separadores de milhar
        aguaResultado.textContent = impacto.agua.toLocaleString('pt-BR');
        co2Resultado.textContent = impacto.co2.toLocaleString('pt-BR');
        pessoasResultado.textContent = impacto.pessoas.toLocaleString('pt-BR');
    }
    
    // Evento de clique no botão calcular
    if (botaoCalcular) {
        botaoCalcular.addEventListener('click', function() {
            // Pega o valor digitado e converte para número
            let valor = parseFloat(inputDesperdicio.value);
            
            // Valida se o valor é um número válido
            if (isNaN(valor) || valor < 0) {
                alert('Por favor, digite um valor válido em quilogramas (ex: 2, 1.5, 0.5)');
                inputDesperdicio.value = '';
                inputDesperdicio.focus();
                return;
            }
            
            // Se o valor for válido, atualiza os resultados
            atualizarResultados(valor);
            
            // Animação suave para mostrar o resultado
            const resultadoArea = document.getElementById('resultadoArea');
            resultadoArea.style.transform = 'scale(1.02)';
            setTimeout(() => {
                resultadoArea.style.transform = 'scale(1)';
            }, 300);
        });
    }
    
    // Permite calcular pressionando a tecla Enter
    if (inputDesperdicio) {
        inputDesperdicio.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                botaoCalcular.click();
            }
        });
    }
    
    // ===== SISTEMA DE ACESSIBILIDADE =====
    // Menu de acessibilidade (abrir/fechar)
    const btnAcessibilidade = document.getElementById('btnAcessibilidade');
    const menuAcessibilidade = document.getElementById('menuAcessibilidade');
    
    if (btnAcessibilidade && menuAcessibilidade) {
        btnAcessibilidade.addEventListener('click', function() {
            menuAcessibilidade.classList.toggle('escondido');
        });
        
        // Fecha o menu se clicar fora dele
        document.addEventListener('click', function(event) {
            if (!btnAcessibilidade.contains(event.target) && !menuAcessibilidade.contains(event.target)) {
                menuAcessibilidade.classList.add('escondido');
            }
        });
    }
    
    // 1. Aumentar Fonte
    const aumentarFonte = document.getElementById('aumentarFonte');
    if (aumentarFonte) {
        aumentarFonte.addEventListener('click', function() {
            // Remove todas as classes de fonte existentes
            document.body.classList.remove('fonte-pequena', 'fonte-normal', 'fonte-grande', 'fonte-muito-grande');
            // Adiciona a classe de fonte grande
            document.body.classList.add('fonte-grande');
        });
    }
    
    // 2. Diminuir Fonte
    const diminuirFonte = document.getElementById('diminuirFonte');
    if (diminuirFonte) {
        diminuirFonte.addEventListener('click', function() {
            document.body.classList.remove('fonte-pequena', 'fonte-normal', 'fonte-grande', 'fonte-muito-grande');
            document.body.classList.add('fonte-pequena');
        });
    }
    
    // Opção extra: Resetar fonte (clique duplo no botão de diminuir, ou podemos adicionar)
    // Para facilitar, vamos permitir que o usuário altere entre tamanhos
    
    // Também vamos adicionar uma opção de fonte normal (ao clicar no botão aumentar se já estiver grande)
    // Melhoramos: ao clicar em aumentar repetidamente, cicla os tamanhos
    const botoesFonte = [aumentarFonte, diminuirFonte];
    
    // 3. Alto Contraste
    const altoContraste = document.getElementById('altoContraste');
    if (altoContraste) {
        altoContraste.addEventListener('click', function() {
            document.body.classList.toggle('alto-contraste');
            
            // Muda o texto do botão para indicar o estado atual
            if (document.body.classList.contains('alto-contraste')) {
                altoContraste.textContent = '🌞 Modo normal';
            } else {
                altoContraste.textContent = '🌓 Alto contraste';
            }
        });
    }
    
    // Inicializa com valores padrão (exemplo de 2kg por semana)
    // Mostra um exemplo inicial para o usuário entender a calculadora
    if (inputDesperdicio) {
        inputDesperdicio.placeholder = "Ex: 2 (kg por semana)";
        // Opcional: mostra um exemplo ao carregar a página
        atualizarResultados(2);
        inputDesperdicio.value = '2';
    }
    
    // ===== SCROLL SUAVE PARA LINKS DO MENU =====
    const linksMenu = document.querySelectorAll('nav a');
    linksMenu.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                event.preventDefault();
                const elementoDestino = document.querySelector(href);
                if (elementoDestino) {
                    elementoDestino.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    console.log('EcoColheita - Site carregado com sucesso! 🌱');
});
