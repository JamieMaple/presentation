;(function() {
  const containerIndex = {
    'browsers': 9,
    '2016': 4,
    '2016open': 5,
    '2017': [6, 7]
  }
  axios.get('./data.json')
    .then(res => res.data).then(data => {
      const data16 = data['2016'].map(item => ({name: item.name, value: item.count}))
      const data16open = data['2016open'].map(item => ({type: item.type, name: item.name, value: Math.random() * 20 + 50}))
      const data17 = {
        '2016': data['2016'].map(item => ({name: item.name, value: item.count})),
        '2017': data['2017'].map(item => ({name: item.name, value: item.count})),
      }

      Reveal.addEventListener('slidechanged', function(e) {
        drawContainer['browsers']({
          chart: echarts.init(document.getElementById('container-browsers')),
          isActive: e.indexh === containerIndex['browsers'],
        })
        drawContainer['2016']({
          data: data16,
          isActive: e.indexh === containerIndex['2016'],
        })
        drawContainer['2016open']({
          data: data16open,
          isActive: e.indexh === containerIndex['2016open'],
        })
        drawContainer['2017']({
          data: {
            '2016': data['2016'].slice(0, 8).reverse(),
            '2017': data['2017'].slice(0, 8).reverse(),
          },
          isActive: e.indexh === containerIndex['2017'][0],
          chart: echarts.init(document.getElementById('container-17-1')),
        })
        drawContainer['2017']({
          data: {
            '2016': data['2016'].slice(8, 15).reverse(),
            '2017': data['2017'].slice(8, 15).reverse(),
          },
          isActive: e.indexh === containerIndex['2017'][1],
          chart: echarts.init(document.getElementById('container-17-2')),
        })
      })
    })

  var chartInstances = {
      container161: echarts.init(document.getElementById('container-16-1')),
      container162: echarts.init(document.getElementById('container-16-2')),
  }

  function getColorByType(type) {
    var colors = {
      'Assembly': '#feaa00',
      'C': '#3a78b6',
      'C++': '#c9214e',
      'Go': '#fc5d00',
      'Java': '#e02a2b',
      'JavaScript': '#9c0f94',
      'Shell': '#6d0fcd',
      'TypeScript': '#ffd700',
      'Plaintext/Markdown': '#15c4a6',
    }
    return colors[type]
  }

  var drawContainer = {
    'browsers'({chart, isActive}) {
      var option = {
        title: {
          text: 'Browser Market Share Worldwide',
          subtext: 'Feb 2018',
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          y: 'bottom',
          data: ['Chrome', 'Safari', 'UC Browser', 'Firefox', 'Opera', 'IE', 'other'],
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            name: 'Browser',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                  show: true,
                  // position: 'center'
              },
              emphasis: {
                  show: true,
                  textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                  }
              }
            },
            data: [
              {value: 57.41, name: 'Chrome'},
              {value: 14.4, name: 'Safari'},
              {value: 7.94, name: 'UC Browser'},
              {value: 5.49, name: 'Firefox'},
              {value: 3.7, name: 'Opera'},
              {value: 3.05, name: 'IE'},
              {value: 8.0, name: 'other'},
            ]
          }
        ]
      }
      if (isActive) {
        chart.setOption(option)
      } else {
        chart.clear()
      }
    },
    '2016'({
      data,
      isActive,
    }) {
      var option = {
        title: {
          text: '15 most popular languages PR on GitHub',
          subtext: 'from octoverse 2016',
          x: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3',
          '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
        legend: {
          x : 'center',
          y : 'bottom',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip : {
          show: true,
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        calculable : true,
        series: [
          {
            name: 'PR counts',
            type: 'pie',
            radius : [0, 140],
            animationDuration: 1500,
            data
          }
        ]
      }
      
      if (isActive) {
        chartInstances.container161.setOption(option)
      } else {
        // chartInstances.container161.clear()
      }
    },
    '2016open'({
      data,
      isActive
    }){
      var categories = Array.from(new Set(data.map(item => item.type))).map(item => ({name: item}))
      var option = {
        title: {
          text: 'most starred open source repos on GitHub',
          subtext: 'from octoverse 2016',
          x: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          show: true,
          formatter: function(item) {
            return item.data.category + ' : ' + item.name
          }
        },
        legend: {
          show: true,
          data: categories,
        },
        animationDuration: 3000,
        series: [{
          type: 'wordCloud',
          sizeRange: [40, 60],
          data: data.map(item => ({
            name: item.name,
            value: item.value,
            category: item.type,
            rotationRange: [-45, 45],
            rotationStep: 45,
            textStyle: {
              normal: {
                color: getColorByType(item.type)
              }
            },
          })),
          roam: true,
        }]
      }
      if (isActive) {
        chartInstances.container162.setOption(option)
      } else {
        // chartInstances.container162.clear()
      }
    },
    '2017'({
      data,
      isActive,
      chart,
    }){
      var option = {
        title: {
          text: '15 most popular languages PR on GitHub',
          subtext: 'from octoverse 2016',
          x: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          height: '70%',
        },
        legend: {
          show: true,
          data: ['2016', '2017'],
          orient: 'vertical',
          right: 0,
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
          },
          axisLine: {
            color: '#fff'
          }
        },
        yAxis: {
          type: 'category',
          data: data['2016'].map(item => item.name),
          axisLabel: {
            color: '#fff'
          }
        },        
        series: [
          {
            name: '2017',
            type: 'bar',
            data: data['2017'].map(item => item.count),
          },
          {
            name: '2016',
            type: 'bar',
            data: data['2016'].map(item => item.count),
          },
        ]
      }

      if (isActive) {
        chart.setOption(option)
      } else {
        // chart.clear()
      }
    }
  }
})()