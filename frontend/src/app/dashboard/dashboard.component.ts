import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { DashboardService } from 'app/services/dashboard.service';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskStats: {
    totalCompleted: number,
    totalPending: number,
    pendingPerPriority: {
      high: number,
      medium: number,
      low: number
    }
  }
  todoListsStats: {
    totalToDoLists: number,
    overdueToDoLists: number,
    countPerDay: [
      {
        day: number,
        count: number,
      }
    ]
  }

  constructor(private dashboardService: DashboardService, private authService: AuthService) { }
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };
  ngOnInit() {


    this.dashboardService.tasksStats(this.authService.getCurrentUser().firebaseUid).subscribe(
      (res) => {
        this.taskStats = res;
        const dataPieChart: any = {
          labels: ['High', 'Normal', 'Low'],
          series: [this.taskStats.pendingPerPriority.high, this.taskStats.pendingPerPriority.medium, this.taskStats.pendingPerPriority.low]
        };

        const optionsPieChart: any = {
          donut: true,
          donutWidth: 40,
          donutSolid: true,
          startAngle: 270,
          showLabel: true,
          ignoreEmptyValues: true
        };
        var pieChart = new Chartist.Pie('#pieChart', dataPieChart, optionsPieChart);
        this.startAnimationForLineChart(pieChart);
      },
    );

    this.dashboardService.todoListsStats(this.authService.getCurrentUser().firebaseUid).subscribe(
      (res) => {
        this.todoListsStats = res;
        console.log(this.todoListsStats);
        const labels = this.todoListsStats.countPerDay.map((item) => item.day);
        const series = this.todoListsStats.countPerDay.map((item) => item.count);
        const dataCountToDoLists: any = {
          labels: labels,
          series: [series],
        }
        const optionsDataCountToDoLists: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: Math.max(...series) + 1,
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
        }
        var countToDoLists = new Chartist.Line('#toDoListsCount', dataCountToDoLists, optionsDataCountToDoLists);
        this.startAnimationForLineChart(countToDoLists);
        const stats = [this.todoListsStats.totalToDoLists, this.todoListsStats.overdueToDoLists];
        var datatoDoListsStatusChart = {
          labels: ['Total', 'Overdue'],
          series: [
            stats
          ]
        };
        var optionstoDoListsStatusChart = {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: this.todoListsStats.totalToDoLists + 1,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
        };
        var responsiveOptions: any[] = [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];
        var toDoListsStatusChart = new Chartist.Bar('#toDoListsStatusChart', datatoDoListsStatusChart, optionstoDoListsStatusChart, responsiveOptions);

        this.startAnimationForBarChart(toDoListsStatusChart);

      });
  }

}
