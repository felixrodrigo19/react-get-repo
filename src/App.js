import React from 'react'
import axios from 'axios'

export default class App extends React.Component {
    state = {
        data: "",
        pesquisa: "",
        resultado: ""
    }

    componentDidMount = async () => {
        console.log("iniciou")

    }
    buscardados = async () => {
        let url = 'https://jsonplaceholder.typicode.com/photos'

        await axios.get(url)
            .then((resposta) => {
                if (resposta.status === 200) {
                    this.setState({
                        data: resposta.data
                    })
                }
            })
    }
    buscarrepo = async () => {
        let url2 = `https://api.github.com/search/repositories?q=${this.state.pesquisa}`// return repository

        await axios.get(url2)
            .then((resposta) => {
                if (resposta.status === 200) {
                    this.setState({
                        resultado: resposta.data
                    })
                }
            })
    }

    render() {
        var lista = ""

        if (this.state.data !== "") {
            lista = this.state.data.map((linha, chave) => {
                return <li key={chave}>
                    <img src={linha.thumbnailUrl}></img>
                    {linha.title}</li>
            }).splice(0, 40) //limite de 40
        }
        var listOfRepos = this.state.resultado
        console.log(listOfRepos)
        return (
            <div>
                <div>
                    <h2>Utilizando o axios</h2>
                    <input type="button" value="buscar dados" onClick={() => { this.buscardados() }} />
                    <ul> {lista} </ul>
                </div>
                <div>
                    <h2>Pesquisando um repositorio no Github</h2>
                    <input type="text" value={this.state.pesquisa} onChange={(e) => { this.setState({ pesquisa: e.target.value }) }} />
                    <input type="button" value="pesquisar" onClick={() => { this.buscarrepo() }} />

                </div>
            </div>
        )
    }
}