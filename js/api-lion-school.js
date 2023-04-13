'use strict'

export const cursosLionSchool = async () => {
    const url = 'https://api-lion-school.cyclic.app/v1/lion-school/cursos'

    const response = await fetch(url)
    const data = await response.json()

    return data

}

export const alunosDoCursoLionSchool = async (siglaCurso) => {

    const url = `https://api-lion-school.cyclic.app/v1/lion-school/alunos?curso=${siglaCurso}`

    const response = await fetch(url)
    const data = await response.json()

    return data

}

export const alunosDeTodosCursos = async () => {
    const url = `https://api-lion-school.cyclic.app/v1/lion-school/alunos`

    const response = await fetch(url)
    const data = await response.json()

    return data
}

export const statusAlunoLion = async (status) => {


    const url = `https://api-lion-school.cyclic.app/v1/lion-school/alunos?status=${status}`

    const response = await fetch(url)
    const data = await response.json()

    return data


}

export const alunosPorAno = async (ano, sigla) => {
    const url = `https://api-lion-school.cyclic.app/v1/lion-school/alunos?ano=${ano}&curso=${sigla}`

    const response = await fetch(url)
    const data = await response.json()
    

    return data
}

export const dadosAluno = async (matricula) => {

    const url = `https://api-lion-school.cyclic.app/v1/lion-school/alunos/${matricula}`

    const response = await fetch(url)
    const data = await response.json()
    console.log(data.aluno)
    

    return data
}

statusAlunoLion('Finalizado')
dadosAluno('20151001001')
alunosPorAno('2023', 'DS')
