<template>
	<div :class="inRenderMode ? 'renderMode' : 'editMode'">
		<notifications position="bottom right"></notifications>
		<!-- modals -->
		<page-color></page-color>
		<page-margins></page-margins>
		<language></language>		

		<top-menu></top-menu>
		<left-menu></left-menu>

		<div>
			<document />
		</div>		
	</div>
</template>