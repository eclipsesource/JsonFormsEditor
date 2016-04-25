angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/index.html',
    "<!DOCTYPE html><html lang=\"en\" ng-app=\"app\"><head><meta charset=\"utf-8\"><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"><title>JSON Forms Editor</title><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><% styles.forEach(function(file){ %><link rel=\"stylesheet\" type=\"text/css\" href=\"<%= file %>\"><% }); %><% scripts.forEach(function(file){ %><script type=\"text/javascript\" src=\"<%= file %>\"></script><% }); %></head><body><div class=\"jsonFormsEditor-Header\" ui-view=\"headerContainer\"></div><!-- show edit area --><div class=\"jsonFormsEditor-Body\" style=\"height: calc(100% - 66px)\" ui-view=\"contentContainer\"><div layout=\"row\" class=\"bottom-border\" style=\"height:100%\"><!-- toolbox --><div class=\"toolbar-container\" layout=\"column\"><div ui-view=\"layoutsContainer\"></div><div style=\"overflow-y: auto\" ui-view=\"toolboxContainer\"></div></div><!-- tree view --><div flex class=\"side-borders\" layout-padding ui-view=\"treeContainer\"></div><!-- properties --><div class=\"toolbar-container layout-column\" ui-view=\"detailContainer\"></div></div></div></body></html>"
  );


  $templateCache.put('app/src/components/detail/detail.html',
    "<md-content layout=\"column\"><md-subheader class=\"md-primary bottom-border\">PROPERTIES<!--<md-icon class=\"material-icons red pull-right\" ng-if=\"detail.detailService.currentElement && !detail.detailService.currentElement.isValid()\">error</md-icon>--><img class=\"detail-alert-image\" ng-if=\"detail.detailService.currentElement && !detail.detailService.currentElement.isValid()\" src=\"/resource/error_icon24.png\"></md-subheader><md-content class=\"md-padding\" ng-class=\"{'bottom-border': detail.detailService.currentElement && !detail.detailService.currentElement.isValid()}\" ng-if=\"detail.detailService.currentElement\"><section class=\"jsf\" layout=\"row\"><jsonforms schema=\"detail.detailService.schema\" ui-schema=\"detail.detailService.uiSchema\" data=\"detail.detailService.currentElement\"></jsonforms></section></md-content><md-subheader ng-if=\"detail.detailService.currentElement && !detail.detailService.currentElement.isValid()\" class=\"md-primary bottom-border\">ERRORS</md-subheader><md-content style=\"min-height: 200px\" ng-if=\"detail.detailService.currentElement && !detail.detailService.currentElement.isValid()\"><div class=\"detail-error-box\"><div class=\"detail-error-entry\" ng-repeat=\"error in detail.detailService.currentElement.getErrors()\">{{error}}</div></div></md-content></md-content>"
  );


  $templateCache.put('app/src/components/dialogs/dataschemaImport/chooseUploadStep/chooseUploadStep.html',
    "<p>The editor allows to efficiently develop form-based web UIs based on a given JSON data schema. You can find more information about the framework on the <a target=\"_blank\" href=\"http://github.eclipsesource.com/jsonforms/\">JSON Forms webpage</a>. To get started, please select below, whether you want to start with an empty data schema or whether you want to import an existing one from the available sources.</p><div ng-cloak><md-grid-list md-cols-xs=\"4\" md-cols-sm=\"4\" md-cols-md=\"4\" md-cols-gt-md=\"4\" md-row-height-gt-md=\"2:1\" md-row-height=\"2:1\" md-gutter=\"10px\" md-gutter-gt-sm=\"8px\" style=\"margin: 0px\"><md-grid-tile ng-repeat=\"hook in dialog.importService.getHooks()\" ng-click=\"hook.openDialog(dialog)\" class=\"dialog-choose-upload-step-hook-box\" md-rowspan=\"1\" md-colspan=\"1\" md-colspan-sm=\"1\" md-ink-ripple><md-icon class=\"material-icons\" style=\"color:white\">{{hook.getIconFont()}}</md-icon><md-grid-tile-footer><h3>{{hook.getTitle()}}</h3></md-grid-tile-footer></md-grid-tile></md-grid-list></div>"
  );


  $templateCache.put('app/src/components/dialogs/dataschemaImport/dataschemaImport.html',
    "<md-dialog class=\"modalDialog data-schema-import-dialog\"><md-toolbar layout=\"row\" layout-align=\"center center\"><div class=\"md-toolbar-tools wizardStepsContainer\"><span ng-repeat=\"step in dialog.getSteps()\" ng-class=\"(step.isActive() ? 'wizardStepActive' : (dialog.isNavigatableStep(step) ? 'wizardStep' : 'wizardStepNotNavigatable'))\" ng-style=\"dialog.getStyle()\" ng-click=\"dialog.goTo(step)\" md-ink-ripple><h2>{{step.getTitle($index, dialog.currentStepNumber())}}</h2></span></div><span flex></span><md-button class=\"md-icon-button\" ng-click=\"dialog.hideDialog()\"><md-icon class=\"material-icons\">close</md-icon></md-button><div class=\"dialogError\" ng-show=\"dialog.shouldDisplayNotification()\">{{dialog.currentNotification}}</div></md-toolbar><div class=\"dialog-description-box\" ng-show=\"dialog.currentStep().getDescription()!==''\"><h4>{{dialog.currentStep().getDescription()}}</h4></div><md-dialog-content class=\"md-padding\"><ng-include src=\"dialog.currentStep().getTemplate()\"></md-dialog-content><md-dialog-actions ng-if=\"dialog.currentStep().hasNavigation()\"><md-button ng-if=\"dialog.hasPrevious()\" ng-click=\"dialog.previous()\">Previous</md-button><md-button class=\"md-primary\" ng-disabled=\"!dialog.isAllowedToContinue()\" ng-click=\"dialog.next()\">{{dialog.getTextNextButton()}}</md-button><md-button class=\"md-primary\" ng-if=\"dialog.currentStep().canSkip()\" ng-click=\"dialog.currentStep().skip()\">Skip</md-button></md-dialog-actions></md-dialog>"
  );


  $templateCache.put('app/src/components/dialogs/dataschemaImport/fromUrlHook/fromUrlStep.html',
    "<md-input-container class=\"md-block\"><form ng-submit=\"dialog.next()\"><label>URL</label><input required type=\"url\" name=\"url\" ng-model=\"dialog.currentStep().url\"><div ng-messages=\"dialog.currentStep().url.$error\" role=\"alert\"><div ng-message-exp=\"['required']\">Please enter a valid URL.</div></div></form></md-input-container>"
  );


  $templateCache.put('app/src/components/dialogs/dataschemaImport/githubHook/githubHookFileStep.html',
    "<md-list><md-icon class=\"material-icons\" ng-if=\"dialog.currentStep().hasParentFolder()\" ng-click=\"dialog.currentStep().goToParentFolder()\">arrow_upward</md-icon><md-list-item ng-repeat=\"file in dialog.currentStep().getFiles() track by $index\" ng-click=\"dialog.currentStep().selectFile(file)\" class=\"github-list-item md-body-1\" ng-class=\"{selectedListItem: dialog.currentStep().selectedFile === file}\">{{file.getName()}}</md-list-item></md-list>"
  );


  $templateCache.put('app/src/components/dialogs/dataschemaImport/githubHook/githubHookLoginStep.html',
    "<div class=\"github-login-image-container\"><img src=\"/resource/github_logo.png\" class=\"github-login-image\" ng-click=\"dialog.next()\"></div>"
  );


  $templateCache.put('app/src/components/dialogs/dataschemaImport/githubHook/githubHookRepoStep.html',
    "<div layout=\"rows\"><md-content flex=\"80\"><md-list><md-list-item ng-repeat=\"repo in dialog.currentStep().getRepos() track by $index\" ng-click=\"dialog.currentStep().selectRepo(repo)\" class=\"github-list-item md-body-1\" ng-class=\"{selectedListItem: dialog.currentStep().selectedRepo === repo}\">{{repo.name}}</md-list-item></md-list></md-content><md-content flex=\"20\"><md-list ng-if=\"dialog.currentStep().someRepoIsSelected\"><md-list-item ng-repeat=\"branch in dialog.currentStep().getBranches() track by $index\" ng-click=\"dialog.currentStep().selectBranch(branch)\" class=\"github-list-item md-body-1\" ng-class=\"{selectedListItem: dialog.currentStep().selectedBranch === branch}\">{{branch.name}}</md-list-item></md-list></md-content></div>"
  );


  $templateCache.put('app/src/components/dialogs/dataschemaImport/githubHook/githubHookUISchemaStep.html',
    "<md-list><md-icon class=\"material-icons\" ng-if=\"dialog.currentStep().hasParentFolder()\" ng-click=\"dialog.currentStep().goToParentFolder()\">arrow_upward</md-icon><md-list-item ng-repeat=\"file in dialog.currentStep().getFiles() track by $index\" ng-click=\"dialog.currentStep().selectFile(file)\" class=\"github-list-item md-body-1\" ng-class=\"{selectedListItem: dialog.currentStep().selectedFile === file}\">{{file.getName()}}</md-list-item></md-list>"
  );


  $templateCache.put('app/src/components/dialogs/dataschemaImport/sociocortexHook/socioCortexHookEntityTypeStep.html',
    "<md-list><md-list-item ng-repeat=\"entityType in dialog.currentStep().sociocortexConnector.getEntityTypes()\" ng-click=\"dialog.currentStep().selectEntityType(entityType)\" ng-class=\"{selectedListItem: dialog.currentStep().selectedEntityType === entityType}\">{{entityType.name}}</md-list-item></md-list>"
  );


  $templateCache.put('app/src/components/dialogs/dataschemaImport/sociocortexHook/socioCortexLoginStep.html',
    "<div class=\"dialogError\" ng-show=\"dialog.currentStep().loginError\">{{dialog.currentStep().loginErrorMessage}}</div><form ng-submit=\"dialog.next()\"><md-input-container class=\"md-block\"><label>SocioCortex Server URL</label><input type=\"text\" name=\"username\" ng-model=\"dialog.currentStep().serverURL\"></md-input-container><md-input-container class=\"md-block\"><label>Username</label><input type=\"text\" name=\"username\" ng-model=\"dialog.currentStep().username\"></md-input-container><md-input-container class=\"md-block\"><label>Password</label><input type=\"password\" name=\"password\" ng-model=\"dialog.currentStep().password\"></md-input-container><button style=\"display: none\" type=\"submit\">Login</button></form>"
  );


  $templateCache.put('app/src/components/dialogs/dataschemaImport/sociocortexHook/socioCortexWorkspaceStep.html',
    "<md-list><md-list-item ng-repeat=\"workspace in dialog.currentStep().sociocortexConnector.getWorkspaces()\" ng-click=\"dialog.currentStep().selectWorkspace(workspace)\" ng-class=\"{selectedListItem: dialog.currentStep().selectedWorkspace === workspace}\">{{workspace.name}}</md-list-item></md-list>"
  );


  $templateCache.put('app/src/components/dialogs/dataschemaImport/uploadHook/uploadStep.html',
    "<form ng-submit=\"dialog.next()\" class=\"dialog-file-upload\"><div class=\"dialog-file-upload-container\"><input type=\"file\" nv-file-select uploader=\"dialog.currentStep().uploaderData\" id=\"dialog-file-upload-data-input\" class=\"ng-hide\"><label for=\"dialog-file-upload-data-input\" class=\"md-raised md-button md-primary\">Data schema</label><p>{{dialog.currentStep().dataFileName}}</p></div><div class=\"dialog-file-upload-container\"><input type=\"file\" nv-file-select uploader=\"dialog.currentStep().uploaderUI\" id=\"dialog-file-upload-ui-input\" class=\"ng-hide\"><label for=\"dialog-file-upload-ui-input\" class=\"md-raised md-button md-primary\">UI Schema</label><p>{{dialog.currentStep().uiFileName}}</p></div></form>"
  );


  $templateCache.put('app/src/components/dialogs/export/exportDialog.html',
    "<md-dialog flex=\"65\"><md-toolbar><div class=\"md-toolbar-tools\"><h2>Export Dialog</h2><span flex></span><md-button class=\"md-icon-button\" ng-click=\"dialog.hideDialog()\"><md-icon class=\"material-icons\">close</md-icon></md-button></div></md-toolbar><md-dialog-content><md-tabs md-border-bottom md-selected=\"dialog.selectedIndex\"><md-tab id=\"uiSchema\" label=\"UI Schema\"><md-content class=\"md-padding\"><md-input-container class=\"md-block\"><textarea ng-model=\"dialog.uiSchema\"></textarea></md-input-container></md-content></md-tab><md-tab id=\"dataSchema\" label=\"Data Schema\"><md-content class=\"md-padding\"><md-input-container class=\"md-block\"><textarea ng-model=\"dialog.dataSchema\"></textarea></md-input-container></md-content></md-tab></md-tabs></md-dialog-content><md-dialog-actions><md-button ngclipboard data-clipboard-text=\"{{dialog.getActiveSchema()}}\" class=\"md-primary\">Copy to clipboard</md-button><md-button ng-click=\"dialog.downloadSchema()\" class=\"md-primary\">Download</md-button><a id=\"a\" style=\"display: none\" ng-href=\"{{dialog.url}}\" download=\"{{dialog.activeSchemaFileName}}\"></a></md-dialog-actions></md-dialog>"
  );


  $templateCache.put('app/src/components/header/header.html',
    "<md-toolbar style=\"height:100%\"><div class=\"md-toolbar-tools\"><div class=\"md-toolbar-tools\" style=\"height: 100%;padding-left: 0px\" ng-click=\"header.showImportDialog()\"><img src=\"resource/jsonforms-logo.png\" class=\"logo-img\"> <span>JSON Forms Editor v0.0.9</span></div><!-- fill up the space between left and right area --><span flex></span><!--<i ng-if=\"header.undoService.canUndo()\" ng-click=\"header.undoService.undo()\" class=\"material-icons\"\n" +
    "           style=\"padding-right: 6px; margin: 4px\">undo</i>--><md-button ng-if=\"!header.configService.isPreviewTab()\" class=\"md-raised md-accent\" ui-sref=\"preview\" ui-sref-active=\"hidden\">Preview</md-button><md-button ng-if=\"!header.configService.isPreviewTab()\" class=\"md-raised md-accent\" ui-sref=\"edit\" ui-sref-active=\"hidden\">Edit</md-button><md-button ng-if=\"header.socioCortexConnector.isLoggedWithSocioCortex()\" class=\"md-raised md-accent\" ng-click=\"header.saveToSocioCortex()\"><md-tooltip md-direction=\"down\">Save to SocioCortex</md-tooltip>Save</md-button><md-button ng-if=\"!header.configService.isPreviewTab() && !header.socioCortexConnector.isLoggedWithSocioCortex()\" class=\"md-raised md-accent\" ng-click=\"header.showExportDialog()\">Export</md-button></div></md-toolbar>"
  );


  $templateCache.put('app/src/components/layouts/layouts.html',
    "<md-subheader class=\"md-primary bottom-border\">LAYOUTS</md-subheader><md-content class=\"layouts-view bottom-border md-padding\"><div ui-tree=\"layouts.treeOptions\" data-clone-enabled=\"true\" data-nodrop-enabled=\"true\"><div layout=\"row\" layout-wrap ui-tree-nodes data-clone-enabled=\"true\" data-nodrop-enabled=\"true\" ng-model=\"layouts.layoutsService.elements\"><md-card flex class=\"layouts-element\" ng-repeat=\"element in layouts.layoutsService.elements\" ui-tree-handle ui-tree-node><md-icon class=\"material-icons\">{{element.getIcon()}}</md-icon><md-tooltip><span>{{element.getLabel()}}</span><span ng-if=\"element.getDescription()!==''\">- {{element.getDescription()}}</span></md-tooltip></md-card></div></div></md-content>"
  );


  $templateCache.put('app/src/components/preview/preview.html',
    "<md-content style=\"height: 100%\" class=\"md-padding jsf\" ng-if=\"preview.previewService.schema\"><jsonforms schema=\"preview.previewService.schema\" ui-schema=\"preview.previewService.uiSchema\" data=\"preview.data\"></jsonforms></md-content><md-button ng-if=\"!preview.configService.isPreviewTab()&&preview.shouldShowNewTabButton()\" ng-click=\"preview.openInNewTab()\" class=\"md-fab accent md-fab-bottom-right\"><md-icon class=\"material-icons\">open_in_new</md-icon></md-button><script>window.addEventListener('message', function (event) {\n" +
    "        var injector = angular.element('html').injector();\n" +
    "        var service = injector.get('PreviewService');\n" +
    "        if (event.data.schema) {\n" +
    "            service.schema = event.data.schema;\n" +
    "        }\n" +
    "        if (event.data.uiSchema) {\n" +
    "            service.uiSchema = event.data.uiSchema;\n" +
    "        }\n" +
    "\n" +
    "        // set to preview Mode\n" +
    "        var config = injector.get('ConfigService');\n" +
    "        config.setIsPreviewTab();\n" +
    "\n" +
    "        // update everything\n" +
    "        var scope = injector.get('$rootScope');\n" +
    "        scope.$apply();\n" +
    "    }, false);</script>"
  );


  $templateCache.put('app/src/components/toolbox/toolbox.html',
    "<md-content style=\"height:100%\" layout=\"column\"><md-subheader class=\"md-primary bottom-border\">CONTROLS</md-subheader><md-content style=\"padding-top: 10px\"><div layout=\"row\" style=\"padding-right: 17px; padding-left: 17px\"><md-switch class=\"md-primary\" style=\"margin-top: 0px; margin-bottom: 0px\" md-no-ink ng-model=\"toolbox.configService.enableFilter\">Hide used elements</md-switch><span flex></span><md-icon class=\"material-icons\" ng-if=\"!toolbox.isParentFolder()\" ng-click=\"toolbox.clickedBack()\">arrow_upward</md-icon></div></md-content><md-content flex class=\"md-padding tree-view\" style=\"margin-bottom:150px; padding-top: 0px\"><div ui-tree=\"toolbox.treeOptions\" id=\"toolbox-root\" data-drag-delay=\"100\" data-clone-enabled=\"true\" data-nodrop-enabled=\"true\"><ol ui-tree-nodes ng-model=\"toolbox.toolboxService.elements\"><li ng-repeat=\"element in toolbox.toolboxService.elements\" ui-tree-node ng-hide=\"toolbox.shouldHide(element)\"><div ui-tree-handle class=\"tree-node tree-node-content\" ng-class=\"{'toolbox-element-placed': toolbox.isPlaced(element)}\" ng-style=\"{cursor: (element.isObject() ? 'default' : 'move')}\"><md-icon ng-if=\"element.isObject()\" ng-click=\"toolbox.clickedIcon(element)\" class=\"material-icons\">{{element.getIcon()}}</md-icon><span ng-if=\"element.isObject()\" ng-click=\"toolbox.clickedIcon(element)\" style=\"overflow:hidden\" class=\"left-margin\">{{element.getLabel()}}</span><md-icon ng-if=\"!element.isObject()\" class=\"material-icons\">{{element.getIcon()}}</md-icon><span ng-if=\"!element.isObject()\" style=\"overflow:hidden\" class=\"left-margin\">{{element.getLabel()}}</span> <a class=\"pull-right left-margin\" ng-hide=\"!toolbox.canBeRemoved(element)\" ng-click=\"toolbox.removeDataElement(element)\"><md-icon class=\"btn material-icons\">delete</md-icon></a></div></li></ol></div></md-content><md-content class=\"toolbox-bottom-control top-border\" ng-controller=\"ToolboxBottomController as toolboxBottom\"><div ng-show=\"toolboxBottom.newElementConfig.hasEnum\" ng-include=\"'enumProperties.html'\"></div><div ng-show=\"toolboxBottom.showAdvanced\" ng-include=\"toolboxBottom.advancedTemplate\"></div><md-button toolbox-focus-input=\"toolbox-bottom-input\" ng-show=\"toolboxBottom.advancedTemplate!=null\" class=\"md-primary md-ink-ripple toolbox-advanced-button\" ng-click=\"toolboxBottom.showAdvanced = !toolboxBottom.showAdvanced\">Advanced</md-button><div layout=\"row\"><div toolbox-focus-input=\"toolbox-bottom-input\" flex class=\"toolbox-input-datatype-box\" ng-repeat=\"(typeLabel, typeTemplate) in toolboxBottom.elementTypes\" ng-click=\"toolboxBottom.changeType(typeLabel, typeTemplate)\" ng-class=\"{'toolbox-input-datatype-box-active': toolboxBottom.newElementTypeLabel===typeLabel}\">{{typeLabel}}</div></div><div layout=\"row\" layout-align=\"space-around center\"><md-input-container flex=\"70\" style=\"margin-top:20px; margin-bottom:0px\"><input id=\"toolbox-bottom-input\" ng-enter=\"toolboxBottom.addNewElement()\" ng-model=\"toolboxBottom.newElementLabel\" class=\"md-primary\" type=\"text\" placeholder=\"Add new attribute...\"></md-input-container><div flex=\"30\"><md-button toolbox-focus-input=\"toolbox-bottom-input\" class=\"md-raised md-primary toolbox-button-create\" ng-click=\"toolboxBottom.addNewElement()\">Create</md-button></div></div><!-- Templates for the advanced menus --><script type=\"text/ng-template\" id=\"basicProperties.html\"><md-checkbox toolbox-focus-input=\"toolbox-bottom-input\" ng-model=\"$parent.toolboxBottom.newElementConfig.required\">Required</md-checkbox>\n" +
    "            <md-checkbox toolbox-focus-input=\"toolbox-bottom-input\" ng-model=\"$parent.toolboxBottom.newElementConfig.hasEnum\">Enum</md-checkbox></script><script type=\"text/ng-template\" id=\"enumProperties.html\"><div layout=\"row\" layout-align=\"space-around center\">\n" +
    "\n" +
    "                <md-input-container flex=\"70\" style=\"margin-top:20px; margin-bottom:0px;\">\n" +
    "                    <input id=\"toolbox-bottom-enum-input\" ng-enter=\"$parent.toolboxBottom.addEnumElement()\" ng-model=\"$parent.toolboxBottom.currentEnumElementLabel\" class=\"md-primary\" type=\"text\" placeholder=\"Add new enum element...\"/>\n" +
    "                </md-input-container>\n" +
    "                <div flex=\"30\">\n" +
    "                    <md-button toolbox-focus-input=\"toolbox-bottom-enum-input\" class=\"md-raised md-primary toolbox-button-create\" ng-click=\"$parent.toolboxBottom.addEnumElement()\">\n" +
    "                        Add\n" +
    "                    </md-button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <md-select toolbox-focus-input=\"toolbox-bottom-enum-input\" ng-model=\"$parent.toolboxBottom.newElementConfig.enum\" multiple placeholder=\"Current elements\">\n" +
    "                <md-option selected=\"true\" ng-repeat=\"elem in $parent.toolboxBottom.newEnumElements\">{{elem}}</md-option>\n" +
    "            </md-select></script></md-content></md-content>"
  );


  $templateCache.put('app/src/components/tree/tree.html',
    "<!-- Nested node template --><script type=\"text/ng-template\" id=\"tree_renderer.html\"><div ui-tree-handle ng-class=\"{'tree-invalid-node': !node.isValid()}\" class=\"tree-node tree-node-content\" ng-click=\"tree.showDetails(node)\">\n" +
    "    <a ng-if=\"node.getElements().length > 0\" data-nodrag ng-click=\"tree.toggle(this)\">\n" +
    "      <md-icon class=\"btn material-icons\" ng-show=\"collapsed\">expand_more</md-icon>\n" +
    "      <md-icon class=\"btn material-icons\" ng-show=\"!collapsed\">expand_less</md-icon>\n" +
    "    </a>\n" +
    "    {{node.getLongType()}} <span ng-show=\"node.getLabel()\">-</span>  {{node.getLabel()}}\n" +
    "    <a class=\"pull-right left-margin\" hideif=\"node.root\" data-nodrag ng-click=\"tree.remove(this)\">\n" +
    "      <md-icon class=\"btn material-icons\">delete</md-icon>\n" +
    "    </a>\n" +
    "  </div>\n" +
    "\n" +
    "  <ol ui-tree-nodes=\"\" ng-model=\"node.elements\" ng-class=\"{hidden: collapsed}\">\n" +
    "    <li ng-repeat=\"node in node.elements\" ui-tree-node ng-include=\"'tree_renderer.html'\"></li>\n" +
    "  </ol></script><!-- tree view --><md-content style=\"height: calc(100% - 60px)\" class=\"md-padding tree-view\"><div style=\"margin-bottom:200px\" ui-tree=\"tree.treeOptions\" id=\"tree-root\" data-drag-delay=\"300\"><ol ui-tree-nodes ng-model=\"tree.treeService.elements\"><li ng-repeat=\"node in tree.treeService.elements\" ui-tree-node ng-include=\"'tree_renderer.html'\"></li></ol></div></md-content>"
  );

}]);
