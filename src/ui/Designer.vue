<template>
	<div :class="inRenderMode ? 'renderMode' : 'editMode'">
		<notifications position="bottom right"></notifications>
		<!-- modals -->
		<page-size></page-size>
		<page-color></page-color>
		<page-margins></page-margins>


		<top-menu></top-menu>
		<left-menu></left-menu>

		<div>
			<document />
		</div>		
	</div>
</template>