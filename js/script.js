'use strict'

import { cursosLionSchool, alunosDoCursoLionSchool, statusAlunoLion, alunosPorAno, dadosAluno } from "./api-lion-school.js"

let cursosLion = await cursosLionSchool()
let cursos = cursosLion.curso

let sair = document.getElementById('sair')

const criarCursos = (cursos, indice) => {

    const cardCurso = document.createElement('a')
    cardCurso.classList.add('curso')

    const divCurso = document.createElement('div')
    divCurso.classList.add('area')

    const imageCurso = document.createElement('img')
    imageCurso.classList.add('image-figure')
    imageCurso.src = `./img/${cursos.icone}`

    const nomeDoCurso = document.createElement('p')
    nomeDoCurso.classList.add('nome-curso')
    nomeDoCurso.textContent = cursos.sigla

    divCurso.append(imageCurso, nomeDoCurso)
    cardCurso.onclick = () => {
        carregarPagina(indice)
    }
    cardCurso.append(divCurso)
    return cardCurso

}

const carregarCurso = () => {
    const container = document.getElementById('cursos')
    const cardCurso = cursos.map(criarCursos)

    container.replaceChildren(...cardCurso)

}

const criarAluno = (alunosCurso, indice) => {

    const divAluno = document.createElement('div')
    divAluno.classList.add('aluno-turma')

    const cardAluno = document.createElement('a')
    cardAluno.classList.add('aluno')

    const imageAluno = document.createElement('img')
    imageAluno.classList.add('foto-aluno')
    imageAluno.alt = 'icone do curso'
    imageAluno.src = `./img/${alunosCurso.foto}`
    

    const nomeDoAluno = document.createElement('p')
    nomeDoAluno.classList.add('nome-aluno')
    nomeDoAluno.textContent = alunosCurso.nome

    if (alunosCurso.status == 'Finalizado') {
        divAluno.style.backgroundColor = '#E5B657'
    }

    cardAluno.append(imageAluno, nomeDoAluno)
    divAluno.append(cardAluno)
    divAluno.onclick = () => {
        let matricula = alunosCurso.matricula
        console.log(matricula)
        carregarAluno(matricula)
    }

    return divAluno

}

const criarDadosDoAluno = (dadosAlun) => {

    const divAluno = document.createElement('div')
    divAluno.classList.add('aluno-info__container')

    const imageAluno = document.createElement('img')
    imageAluno.classList.add('foto-aluno')
    imageAluno.src = `./img/${dadosAlun.foto}`

    const nomeDoAluno = document.createElement('p')
    nomeDoAluno.classList.add('nome-aluno')
    nomeDoAluno.textContent = dadosAlun.nome

    divAluno.append(imageAluno, nomeDoAluno)

    return divAluno
}

const carregarAluno = async (matricula) => {


    const alunos = document.getElementById('alunos')
    const filtro = document.getElementById('filter')
    const alun = document.getElementById('alno')
    const grafico = document.getElementById('grafico')

    alunos.style.display = 'none'
    filtro.style.display = 'none'
    alun.style.display = 'flex'
    grafico.style.display = 'flex'

    
    let dados = await dadosAluno(matricula)
    let dadosAlun = dados.aluno
    let aluno = dadosAlun.map(criarDadosDoAluno)

    graficoMedia(matricula)

    alun.append(...aluno, grafico)

}

const graficoMedia = async (matricula) => {
    const ctx = document.getElementById('myChart')

    let notasMedia = []
    let coresGrafico = []
    let letrasDisciplinas = []
    let siglaDisciplinas = []
    let arraySiglas = []

    let dadosAlun = await dadosAluno(matricula)
    let aluno = dadosAlun.aluno
    aluno.forEach(function (alun) {

        alun.disciplinas.forEach(function (dis) {
            console.log(dis.nome)
            let nomes = dis.nome

            let nome = nomes.split('')
            letrasDisciplinas.push(nome)
        })
    })

    letrasDisciplinas.forEach(function (letra) {
        const siglaDasDisciplinas = letra.filter(function (letraArray) {
            if (letraArray === letraArray.toUpperCase() && letraArray != ' ') {

                let letter = letraArray
                let arrayLetter = []
                return arrayLetter.push(letter)
            }
        })

        arraySiglas.push(siglaDasDisciplinas)
    })

    arraySiglas.forEach(function (array) {
        const siglas = array.reduce((accumulator, letra) => `${accumulator}${letra}`);
        siglaDisciplinas.push(siglas)
    })

    aluno.forEach(function (alun) {
        alun.disciplinas.forEach(function (dis) {
            let media = dis.media
            if (media <= 40) {
                let color = 'rgba(178, 34, 34, 1)'
                coresGrafico.push(color)
            } else if (media >= 50 && media <= 60) {
                let color = 'rgba(255, 215, 0, 1)'
                coresGrafico.push(color)
            } else if (media > 60) {
                let color = 'rgba(135, 206, 250, 1)'
                coresGrafico.push(color)
            }
            notasMedia.push(media)
        })
    });


    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: siglaDisciplinas,
            datasets: [{
                label: 'Media da nota',
                data: notasMedia,
                backgroundColor: coresGrafico,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Media de notas de acordo com materia'
                }
            }
        }
    });

}

const carregarAlunos = async (sigla, titulo) => {
    let finalizado = document.getElementById('finalizado')
    let status = document.getElementById('todos')
    let cursando = document.getElementById('cursando')


    const alunos = document.getElementById('alunos')

    const tituloPage = document.createElement('h1')
    tituloPage.classList.add('titulo-curso')
    const tituloCurso = titulo

    tituloPage.textContent = tituloCurso.substring(6)

    let alunosDoCurso = await alunosDoCursoLionSchool(sigla)
    let alunosCurso = alunosDoCurso.alunos

    const turma = document.getElementById('turma')
    const cardAluno = alunosCurso.map(criarAluno)

    cursando.onclick = async () => {
        const turma = document.getElementById('turma')
        const statusAluno = await statusAlunoLion('Cursando')
        const alunoStatus = statusAluno.alunos

        const cardAluno = alunoStatus.map(function (aluno) {
            if (aluno.sigla == sigla) {
                const card = criarAluno(aluno)
                return card
            }
        })

        const CardAlunoCursando = cardAluno.filter(function (alunoCursando) {
            return alunoCursando !== undefined;
        })

            turma.replaceChildren(...CardAlunoCursando)
            alunos.append(tituloPage, turma)
        


    }

    finalizado.onclick = async () => {
        let statusAluno = await statusAlunoLion('Finalizado')
        let alunoStatus = statusAluno.alunos

        const cardAluno = alunoStatus.map(function (aluno) {
            if (aluno.sigla == sigla) {
                const card = criarAluno(aluno)
                return card
            }
        })

        const CardAlunoFinalizado = cardAluno.filter(function (alunoFinalizado) {
            return alunoFinalizado !== undefined;
        });

        turma.replaceChildren(...CardAlunoFinalizado)
        alunos.append(tituloPage, turma)

    }

    status.onclick = () => {
        const cardAluno = alunosCurso.map(criarAluno)
        turma.replaceChildren(...cardAluno)
        alunos.append(tituloPage, turma)
    }

    const input = document.getElementById('input-ano')
    input.addEventListener('keydown', async function (e) {
        if (e.key === 'Enter') {

            const alunos1 = await alunosPorAno(input.value, sigla)

            const alunosAno = alunos1.alunos
            const alunoNovo = alunosAno.map((aluno) => {
                const cardAluno = criarAluno(aluno)
                return cardAluno
            })

            turma.replaceChildren(...alunoNovo)
            alunos.append(turma)
        }
    })



    const ano = document.getElementById('button-ano')
    ano.onclick = async () => {

        const alunos1 = await alunosPorAno(input.value, sigla)
        const alunosAno = alunos1.alunos

        const alunoNovo = alunosAno.map((aluno) => {
            const cardAluno = criarAluno(aluno)
            return cardAluno
        })

        turma.replaceChildren(...alunoNovo)
        alunos.append(turma)
    }

    turma.replaceChildren(...cardAluno)
    alunos.append(tituloPage, turma)

    
}

const carregarPagina = (indice) => {
    const home = document.getElementById('home')
    const alunos = document.getElementById('alunos')
    const filtro = document.getElementById('filter')

    home.style.display = 'none'
    alunos.style.display = 'flex'
    sair.textContent = 'Voltar'
    filtro.style.display = 'flex'

    sairEVoltarPagina(sair)

    const sigla = cursos[indice].sigla
    const titulo = cursos[indice].nome
    carregarAlunos(sigla, titulo)

}

const sairEVoltarPagina = (estado) => {
    let sair = document.getElementById('sair')

    sair.onclick = () => {
        if (estado.textContent == 'Sair') {
            window.close()
        } else {
            window.location.reload()
        }

    }
}

carregarCurso()

