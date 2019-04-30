import React, { Component } from "react";
import axios from "../../node_modules/axios";

const apiUrl = "https://api.cartolafc.globo.com";

class AthletesList extends Component {
  state = {
    athletes: []
  };

  componentDidMount() {
    this.getAthletes()
      .then(res => this.setState({ athletes: res["atletas"] }))
      .catch(err => console.error(err));
  }

  getAthletes = async () => {
    const response = await fetch("/atletas/mercado");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Média</th>
              <th>Pontos</th>
              <th>Preço (53%)</th>
              <th>Pontos (Min)</th>
            </tr>
          </thead>
          <tbody>
            {this.state.athletes.map(user => {
              let media_min = user.preco_num * 0.49;
              let pontos_min = media_min * 2 - user.media_num;
              return (
                <tr key={user.atleta_id}>
                  <th>{user.apelido}</th>
                  <th>{user.preco_num}</th>
                  <th>{user.media_num}</th>
                  <th>{user.pontos_num}</th>
                  <th>{media_min}</th>
                  <th>{pontos_min}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AthletesList;
