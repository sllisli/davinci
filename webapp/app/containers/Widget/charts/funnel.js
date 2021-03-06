/*
 * <<
 * Davinci
 * ==
 * Copyright (C) 2016 - 2017 EDP
 * ==
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * >>
 */

/*
 * Funnel chart options generator
 */

export default function (dataSource, flatInfo, chartParams, interactIndex) {
  const {
    title,
    value,
    min,
    max,
    gap,
    tooltip,
    legend,
    toolbox,
    top,
    left,
    width,
    height,
    minSize,
    maxSize
  } = chartParams

  let metricOptions,
    minOption,
    maxOption,
    gapOption,
    tooltipOptions,
    legendOptions,
    toolboxOptions

  // series 数据项
  let metricArr = []

  minOption = min && {
    min: min
  }

  maxOption = max && {
    max: max
  }

  gapOption = gap && {
    gap: gap
  }

  let serieObj = Object.assign({},
    {
      name: '数据',
      type: 'funnel',
      top: `${top}%`,
      left: `${left}%`,
      width: `${width}%`,
      height: `${height}%`,
      minSize: `${minSize}%`,
      maxSize: `${maxSize}%`,
      sort: 'descending',
      label: {
        normal: {
          show: true,
          position: 'inside'
        },
        emphasis: {
          textStyle: {
            fontSize: 20
          }
        }
      },
      labelLine: {
        normal: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        }
      },
      itemStyle: {
        normal: {
          borderColor: '#fff',
          borderWidth: 1,
          opacity: interactIndex === undefined ? 1 : 0.25
        }
      },
      data: dataSource.map((d, index) => {
        if (index === interactIndex) {
          return {
            name: d[title],
            value: Number(d[value]),
            itemStyle: {
              normal: {
                opacity: 1
              }
            }
          }
        } else {
          return {
            name: d[title],
            value: Number(d[value])
          }
        }
      })
    },
    minOption,
    maxOption,
    gapOption
  )
  metricArr.push(serieObj)
  metricOptions = {
    series: metricArr
  }

  // tooltip
  tooltipOptions = tooltip && tooltip.length
    ? {
      tooltip: {
        trigger: 'item'
      }
    } : null

  // legend
  legendOptions = legend && legend.length
    ? {
      legend: {
        data: dataSource.map(d => d[title]),
        orient: 'vertical',
        x: 'left'
      }
    } : null

  // toolbox
  toolboxOptions = toolbox && toolbox.length
    ? {
      toolbox: {
        feature: {
          dataView: {readOnly: false},
          restore: {},
          saveAsImage: {}
        }
      }
    } : null

  return Object.assign({},
    {
      calculable: true
    },
    metricOptions,
    tooltipOptions,
    legendOptions,
    toolboxOptions
  )
}
