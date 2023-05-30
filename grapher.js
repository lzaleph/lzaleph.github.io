// Generated by CoffeeScript 1.12.7
(function() {
  var Grapher;

  Grapher = (function() {
    function Grapher() {
      this.players = [];
      this.turnCounts = {};
      this.vpTotals = {};
      this.moneyTotals = {};
    }

    Grapher.prototype.reset = function() {
      this.players = [];
      this.turnCounts = {};
      this.vpTotals = {};
      this.moneyTotals = {};
      $.plot($("#money-graph"), []);
      return $.plot($("#vp-graph"), []);
    };

    Grapher.prototype.setPlayers = function(players) {
      if (players.join() !== this.players.join()) {
        this.reset();
        return this.players = players;
      }
    };

    Grapher.prototype.recordMoney = function(player, turn, money) {
      var base, base1, base2, base3;
      if ((base = this.moneyTotals)[player] == null) {
        base[player] = [0];
      }
      if ((base1 = this.turnCounts)[player] == null) {
        base1[player] = [];
      }
      if ((base2 = this.turnCounts[player])[turn] == null) {
        base2[turn] = 0;
      }
      this.turnCounts[player][turn]++;
      if ((base3 = this.moneyTotals[player])[turn] == null) {
        base3[turn] = 0;
      }
      return this.moneyTotals[player][turn] += money;
    };

    Grapher.prototype.recordVP = function(player, turn, vp) {
      var base, base1;
      if ((base = this.vpTotals)[player] == null) {
        base[player] = [3];
      }
      if ((base1 = this.vpTotals[player])[turn] == null) {
        base1[turn] = 0;
      }
      return this.vpTotals[player][turn] += vp;
    };

    Grapher.prototype.updateGraphs = function() {
      var base, i, j, len, money, moneySeries, player, ref, ref1, ref2, ref3, turn, vp, vpSeries;
      moneySeries = [];
      vpSeries = [];
      ref = this.players;
      for (i = 0, len = ref.length; i < len; i++) {
        player = ref[i];
        money = [];
        vp = [];
        for (turn = j = 1; j <= 30; turn = ++j) {
          if ((base = this.turnCounts)[player] == null) {
            base[player] = [];
          }
          if ((ref1 = this.turnCounts[player][turn]) != null ? ref1 : 0 > 0) {
            money.push([turn, ((ref2 = this.moneyTotals[player][turn]) != null ? ref2 : 0) / this.turnCounts[player][turn]]);
            vp.push([turn, ((ref3 = this.vpTotals[player][turn]) != null ? ref3 : 0) / this.turnCounts[player][turn]]);
          }
        }
        moneySeries.push({
          label: player,
          data: money
        });
        vpSeries.push({
          label: player,
          data: vp
        });
      }
      moneySeries[0].color = 2;
      moneySeries[1].color = 1;
      vpSeries[0].color = 2;
      vpSeries[1].color = 1;
      $.plot($("#money-graph"), moneySeries, {
        series: {
          lines: {
            show: true
          },
          points: {
            show: true
          }
        },
        xaxis: {
          min: 0,
          max: 30
        },
        yaxis: {
          min: 0
        },
        legend: {
          position: 'nw'
        }
      });
      return $.plot($("#vp-graph"), vpSeries, {
        series: {
          lines: {
            show: true
          },
          points: {
            show: true
          }
        },
        xaxis: {
          min: 0,
          max: 30
        },
        yaxis: {
          min: 0
        },
        legend: {
          position: 'nw'
        }
      });
    };

    return Grapher;

  })();

  this.Grapher = Grapher;

}).call(this);