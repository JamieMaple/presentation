;(function() {
  axios.get('./data.json')
    .then(res => res.data).then(data => {
      const data16 = data['2016'].map(item => ({name: item.name, value: item.count}))
      const data16open = data['2016open'].map(item => ({type: item.type, name: item.name, value: Math.random() * 20 + 50}))
      const data17 = data['2017'].map(item => ({name: item.name, value: item.count}))

      Reveal.addEventListener('slidechanged', function(e) {
        drawContainer['drawPie']({
          data: data16,
          isActive: e.indexh === 31,
          other: {
            subtext: 'from octoverse 2016',
            chart: chartInstances.container161,
          }
        })
        drawContainer['2016open'](data16open, e.indexh === 32)
        drawContainer['drawPie']({
          data: data17,
          isActive: e.indexh === 33,
          other: {
            subtext: 'from octoverse 2017',
            chart: chartInstances.container171,
            formatter: function(data) {
              var name = data.data.name
              var val = Number(data.data.value)
              var formated = data.seriesName + ' <br/> '

              if (val >= 1000000) {
                formated += name + ' : ' + (val / 1000000) + 'M'
              } else if (val > 1000) {
                formated += name + ' : ' + Math.floor(val / 1000) + 'K'
              }
              return formated + '(' + data.percent + '%)'
            }
          }
        })
      })
    })

  var chartInstances = {
      container161: echarts.init(document.getElementById('container-16-1')),
      container162: echarts.init(document.getElementById('container-16-2')),
      container171: echarts.init(document.getElementById('container-17-1')),
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
    'drawPie': function({
      data,
      isActive,
      other: {
        text = '15 most popular languages PR on GitHub',
        subtext,
        chart,
        formatter = '{a} <br/>{b} : {c} ({d}%)',
      }
    }) {
      var option = {
        title: {
          text: text,
          subtext: subtext,
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
          formatter: formatter
        },
        calculable : true,
        animationDuration: 1500,
        series: [
          {
            name: 'PR counts',
            type: 'pie',
            radius : [0, 140],
            data
          }
        ]
      }
      
      if (isActive) {
        chart.setOption(option)
      } else {
        chart.clear()
      }
    },
    '2016open': function(data, isActive){
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
            rotationRange: [-90, 90],
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
        chartInstances.container162.clear()
      }
    },
  }
})()