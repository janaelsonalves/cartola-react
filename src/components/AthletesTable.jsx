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
      athletes: []
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
                <TableCell align="right">Nome</TableCell>
                <TableCell align="right">Preço (C$)</TableCell>
                <TableCell align="right">Média</TableCell>
                <TableCell align="right">Pontos</TableCell>
                <TableCell align="right">Variacao</TableCell>
                <TableCell align="right">Variacao (%)</TableCell>
                <TableCell align="right">Preco Anterior</TableCell>
                <TableCell align="right">Preço/Média</TableCell>
                <TableCell align="right">Preço (53%)</TableCell>
                <TableCell align="right">Pontos (min)(var)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.athletes
                .sort((a, b) => (b.media_num > a.media_num ? 1 : -1))
                .map(athlete => {
                  let media_min = athlete.preco_num * 0.49;
                  let pontos_min = media_min * 2 - athlete.media_num;
                  let preco_anterior = athlete.preco_num - athlete.variacao_num;
                  let foto = "";
                  try {
                    foto = athlete["foto"].replace("FORMATO", "140x140");
                  } catch (error) {
                    console.error(error);
                  }
                  return (
                    <TableRow key={athlete.atleta_id}>
                      <TableCell component="th" scope="row">
                        <Grid container justify="center" alignItems="center">
                          {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} /> */}
                          <Avatar
                            alt="Remy Sharp"
                            src={foto}
                            className={classes.bigAvatar}
                          />
                        </Grid>
                      </TableCell>
                      <TableCell align="right">{athlete.apelido}</TableCell>
                      <TableCell align="right">
                        {athlete.preco_num.toLocaleString("pt-BR", {
                          maximumFractionDigits: 2
                        })}
                      </TableCell>
                      <TableCell align="right">
                        {athlete.media_num.toLocaleString("pt-BR", {
                          maximumFractionDigits: 2
                        })}
                      </TableCell>
                      <TableCell align="right">
                        {athlete.pontos_num.toLocaleString("pt-BR", {
                          maximumFractionDigits: 2
                        })}
                      </TableCell>
                      <TableCell align="right">
                        {athlete.variacao_num.toLocaleString("pt-BR", {
                          maximumFractionDigits: 2
                        })}
                      </TableCell>
                      <TableCell align="right">
                        {(athlete.preco_num / preco_anterior).toLocaleString(
                          "pt-BR",
                          {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                            style: "percent"
                          }
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {preco_anterior.toLocaleString("pt-BR", {
                          maximumFractionDigits: 2
                        })}
                      </TableCell>
                      <TableCell align="right">
                        {(athlete.preco_num / athlete.media_num).toLocaleString(
                          "pt-BR",
                          {
                            maximumFractionDigits: 2
                          }
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {media_min.toLocaleString("pt-BR", {
                          maximumFractionDigits: 2
                        })}
                      </TableCell>
                      <TableCell align="right">
                        {pontos_min.toLocaleString("pt-BR", {
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
      .then(res => this.setState({ athletes: res["atletas"] }))
      .catch(err => console.error(err));
  }

  getAthletes = async () => {
    const response = await fetch("/atletas/mercado");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
}
AthletesTable.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(AthletesTable);
