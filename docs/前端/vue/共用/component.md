# component

通过 `:is`绑定组件名或组件选项对象、支持所有 Vue 组件（包括异步组件）

```vue
<component
  :is="stepModuleMap[currentStep]"
  ref="stepModuleRef"
></component>

import basicInformation from '@/views/perfessionConstruct/components/personComponents/modules/basicInformation.vue'
import careerOrientation from '@/views/perfessionConstruct/components/personComponents/modules/careerOrientation.vue'
import objectivesSpecifications from '@/views/perfessionConstruct/components/personComponents/modules/objectivesSpecifications.vue'

const { currentStep } = storeToRefs(aiPersonStore)
const stepModuleMap = ref({
  0: comp0,
  1: comp1,
  2: comp2,
})
// 基础信息填写
const comp0 = shallowRef(basicInformation)
// 确定职业面向
const comp1 = shallowRef(careerOrientation)
// 确定培养目标与规格
const comp2 = shallowRef(objectivesSpecifications)
```

