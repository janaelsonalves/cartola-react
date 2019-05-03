import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import MenuAppBar from "./ui/MenuAppBar.jsx";
import ButtonAppBar from "./ui/ButtonAppBar.jsx";

import { resizePhotoFromUrl } from "../shared/CartolaUtils";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  }
});

class AthletesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      athletes: [],
      teams: []
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* <MenuAppBar /> */}
        <ButtonAppBar />
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">Preço (C$)</TableCell>
                <TableCell align="center">Média</TableCell>
                <TableCell align="center">Pontos</TableCell>
                <TableCell align="center">Variacao</TableCell>
                <TableCell align="center">Variacao (%)</TableCell>
                <TableCell align="center">Preco Anterior</TableCell>
                <TableCell align="center">Preço/Média</TableCell>
                <TableCell align="center">Preço (53%)</TableCell>
                <TableCell align="center">Pontos (min)(var)</TableCell>
                <TableCell align="center">Pontos (Total) </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.athletes
                .sort((a, b) => (b.media_num > a.media_num ? 1 : -1))
                .map(athlete => {
                  let media_min = athlete.preco_num * 0.49;
                  let pontos_min = media_min * 2 - athlete.media_num;
                  let pontos_total = athlete.media_num * athlete.jogos_num;
                  let preco_anterior = athlete.preco_num - athlete.variacao_num;
                  let foto = "";
                  let clube = this.findTeamById(athlete.clube_id);
                  // console.log("Clube: ", clube);
                  try {
                    foto = athlete["foto"].replace("FORMATO", "140x140");
                  } catch (error) {
                    console.error(error);
                  }
                  return (
                    <TableRow key={athlete.atleta_id}>
                      <TableCell component="th" scope="row">
                        {athlete.clube_id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Grid container justify="center" alignItems="center">
                          {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} /> */}
                          <Avatar
                            alt="Remy Sharp"
                            src={foto}
                            className={classes.avatar}
                          />
                        </Grid>
                      </TableCell>
                      <TableCell align="left">{athlete.apelido}</TableCell>
                      <TableCell align="center">
                        {athlete.preco_num.toLocaleString("pt-BR", {
                          maximumFractionDigits: 2
                        })}
                      </TableCell>
                      <TableCell align="center">
                        {athlete.media_num.toLocaleString("pt-BR", {
                          maximumFractionDigits: 2
                        })}
                      </TableCell>
                      <TableCell align="center">
                        {athlete.pontos_num.toLocaleString("pt-BR", {
                          maximumFractionDigits: 2
                        })}
                      </TableCell>
                      <TableCell align="center">
                        {athlete.variacao_num.toLocaleString("pt-BR", {
                          maximumFractionDigits: 2
                        })}
                      </TableCell>
                      <TableCell align="center">
                        {(athlete.preco_num / preco_anterior).toLocaleString(
                          "pt-BR",
                          {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                            style: "percent"
                          }
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {preco_anterior.toLocaleString("pt-BR", {
                          maximumFractionDigits: 2
                        })}
                      </TableCell>
                      <TableCell align="center">
                        {(athlete.preco_num / athlete.media_num).toLocaleString(
                          "pt-BR",
                          {
                            maximumFractionDigits: 2
                          }
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {media_min.toLocaleString("pt-BR", {
                          maximumFractionDigits: 2
                        })}
                      </TableCell>
                      <TableCell align="center">
                        {pontos_min.toLocaleString("pt-BR", {
                          maximumFractionDigits: 2
                        })}
                      </TableCell>
                      <TableCell align="center">
                        {pontos_total.toLocaleString("pt-BR", {
                          maximumFractionDigits: 2
                        })}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }

  componentDidMount() {
    this.getAthletes()
      .then(res =>
        this.setState({ athletes: res["atletas"], teams: res["clubes"] })
      )
      .catch(err => console.error(err));
  }

  getAthletes = async () => {
    const response = await fetch("/atletas/mercado");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  // findTeamById = async id => {
  findTeamById = id => {
    let entries = Object.entries(this.state.teams);
    let team = entries[1].filter(team => {
      return id === team["id"];
    });
    return team[0]; /* 
    for (const [team_id, team] of entries) {
      console.log(`Id: ${id}, Team id: ${team_id}, Team: ${team["id"]}`);
      console.log(id === team["id"]);
      if (team_id === id) {
        console.log("Yes");
        console.log(`Id: ${id}, Team id: ${team_id}, Team: ${team["id"]}`);
        return team;
      }
    }
    return null; */
  };
}
AthletesTable.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(AthletesTable);
