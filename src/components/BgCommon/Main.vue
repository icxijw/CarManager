<template>
	<div class="main">
		<el-tabs v-model="editableTabsValue"  type="border-card" class="content" editable @edit="handleTabsEdit">
			<el-tab-pane :key="item.name" v-for="(item) in editableTabs" :label="item.title" :name="item.name" >
				<span slot="label"><i class="el-icon-refresh"></i> {{item.title}}</span>{{item.content}}
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import bus from './bus';
	export default {
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1',
				editableTabsValue: '2',
				editableTabs: [{
					title: 'Tab 1',
					name: '1',
					content: 'Tab 1 content'
				}, {
					title: 'Tab 2',
					name: '2',
					content: 'Tab 2 content'
				}],
				tabIndex: 2
			};
		},
		methods: {
			handleTabsEdit(targetName, action) {
				if (action === 'add') {
					let newTabName = ++this.tabIndex + '';
					this.editableTabs.push({
						title: 'New Tab',
						name: newTabName,
						content: 'New Tab content'
					});
					this.editableTabsValue = newTabName;
				}
				if (action === 'remove') {
					let tabs = this.editableTabs;
					let activeName = this.editableTabsValue;
					if (activeName === targetName) {
						tabs.forEach((tab, index) => {
							if (tab.name === targetName) {
								let nextTab = tabs[index + 1] || tabs[index - 1];
								if (nextTab) {
									activeName = nextTab.name;
								}
							}
						});
					}

					this.editableTabsValue = activeName;
					this.editableTabs = tabs.filter(tab => tab.name !== targetName);
				}
			}
		}
	}
</script>

<style>
.main {
	/* margin-left: 15.625rem; */
    padding:0 0rem 0 0.625rem; 
	width: 100%;
	height: 100%;
}

.content {
    width: auto;
    height: 100%;
}
</style>
