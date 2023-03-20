'use strict'

import { getDadosEstado } from "./estados_cidades.js"
import { getCidadesEstado } from "./estados_cidades.js"

const mapa = document.querySelector('svg')

const getEstados = async (event) => {
    const estado = event.target.id.replace('BR-', '')
    
    const dadosEstado = await getDadosEstado(estado)
    
    const container = document.getElementById('info-container')

    const info_estado = document.createElement('span')
    info_estado.classList.add('info_estado')

    const info_sigla = document.createElement('span')
    info_sigla.classList.add('info_sigla')
    
    const sigla = document.createElement('p')
    sigla.textContent = estado

    const info_textos = document.createElement('span')
    info_textos.classList.add('info_textos')

    const nomeEstado = document.createElement('h3')
    nomeEstado.textContent = dadosEstado.estado

    const capital = document.createElement('p')
    capital.classList.add('capital')
    capital.textContent = dadosEstado.capital

    const regiao = document.createElement('p')
    regiao.classList.add('regiao')
    regiao.textContent = dadosEstado.regiao

    info_sigla.append(sigla)
    info_textos.append(nomeEstado, capital, regiao)
    info_estado.append(info_sigla, info_textos)
    container.replaceChildren(info_estado)
    

    getCidades(event)

    return container
    
}

const getCidades = async (event) => {
    const estado = event.target.id.replace('BR-', '')

    const cidadesJson = await getCidadesEstado(estado)

    

    const info_cidades = document.createElement('span')
    info_cidades.classList.add('info_cidades')

    const tituloCidades = document.createElement('h3')
    tituloCidades.textContent = 'Cidades: '

    cidadesJson.cidades.forEach(function(cidade){
        const nomeCidade = document.createElement('p')
        nomeCidade.textContent = cidade

        info_cidades.append(nomeCidade)
    })

    info_cidades.append(tituloCidades)
    container.replaceChildren(info_cidades)

    return container
}

mapa.addEventListener('click', getEstados)


