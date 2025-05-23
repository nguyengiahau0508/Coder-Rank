
import {ChangeDetectorRef, Component, ViewEncapsulation, type AfterViewInit, ElementRef, ViewChild, Input, Output, EventEmitter} from '@angular/core';

import {CommonModule} from '@angular/common';

import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {
  type EditorConfig,
  ClassicEditor,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  Bold,
  CKBox,
  CKBoxImageEdit,
  CloudServices,
  Code,
  CodeBlock,
  Emoji,
  Essentials,
  GeneralHtmlSupport,
  Heading,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Mention,
  Paragraph,
  PasteFromOffice,
  PictureEditing,
  ShowBlocks,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation
} from 'ckeditor5';
import {PasteFromOfficeEnhanced, SourceEditingEnhanced} from 'ckeditor5-premium-features';


import translations from 'ckeditor5/translations/vi.js';
import premiumFeaturesTranslations from 'ckeditor5-premium-features/translations/vi.js';


const LICENSE_KEY =
  'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDc4NzE5OTksImp0aSI6ImIwNWMwM2E1LTk5ZTMtNGE5ZC05ZDkxLTJiYzE4NWI3NTgzOSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImM0Nzk0NDliIn0.tXrGjCoMJoqLt7NxgjN-mFarmjzAg4akr87WGOQwBQcqn9-6Srs61BS8wLscGSiQE4ZKPap67oOcOQSZmCjexg';
const CLOUD_SERVICES_TOKEN_URL =
  'https://hgctpcpo4ii8.cke-cs.com/token/dev/791faea982e2a969e034f708eb9a2852884e5a84bbad768b74211b9d6b52?limit=10';
const CLOUD_SERVICES_WEBSOCKET_URL = 'wss://hgctpcpo4ii8.cke-cs.com/ws';

const AI_API_KEY = '<YOUR_AI_API_KEY>';

/**
 * Unique ID that will be used to identify this document. E.g. you may use ID taken from your database.
 * Read more: https://ckeditor.com/docs/ckeditor5/latest/api/module_collaboration-core_config-RealTimeCollaborationConfig.html
 */
const DOCUMENT_ID = '<YOUR_DOCUMENT_ID>';

@Component({
  selector: 'app-text-editor',
  imports: [
    CommonModule,
    CKEditorModule
  ],
  standalone: true,
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class TextEditorComponent implements AfterViewInit {
  @Input() htmlInitialData: string = '';
  @Output() htmlChange = new EventEmitter<string>();

  constructor(private changeDetector: ChangeDetectorRef) {}

  public isLayoutReady = false;
  public Editor = ClassicEditor;
  public config: EditorConfig = {}; // CKEditor needs the DOM tree before calculating the configuration.
  public ngAfterViewInit(): void {
    this.config = {
      toolbar: {
        items: [
          'sourceEditingEnhanced',
          'showBlocks',
          '|',
          'heading',
          '|',
          'bold',
          'italic',
          'code',
          '|',
          'emoji',
          'link',
          'insertImage',
          'ckbox',
          'insertTable',
          'codeBlock',
          'htmlEmbed',
          '|',
          'bulletedList',
          'numberedList'
        ],
        shouldNotGroupWhenFull: false
      },
      plugins: [
        Autoformat,
        AutoImage,
        AutoLink,
        Autosave,
        Bold,
        CKBox,
        CKBoxImageEdit,
        CloudServices,
        Code,
        CodeBlock,
        Emoji,
        Essentials,
        GeneralHtmlSupport,
        Heading,
        HtmlComment,
        HtmlEmbed,
        ImageBlock,
        ImageCaption,
        ImageInline,
        ImageInsert,
        ImageInsertViaUrl,
        ImageResize,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        Italic,
        Link,
        LinkImage,
        List,
        ListProperties,
        Mention,
        Paragraph,
        PasteFromOffice,
        PasteFromOfficeEnhanced,
        PictureEditing,
        ShowBlocks,
        SourceEditingEnhanced,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TextTransformation
      ],
      cloudServices: {
        tokenUrl: CLOUD_SERVICES_TOKEN_URL
      },
      heading: {
        options: [
          {
            model: 'paragraph',
            title: 'Paragraph',
            class: 'ck-heading_paragraph'
          },
          {
            model: 'heading1',
            view: 'h1',
            title: 'Heading 1',
            class: 'ck-heading_heading1'
          },
          {
            model: 'heading2',
            view: 'h2',
            title: 'Heading 2',
            class: 'ck-heading_heading2'
          },
          {
            model: 'heading3',
            view: 'h3',
            title: 'Heading 3',
            class: 'ck-heading_heading3'
          },
          {
            model: 'heading4',
            view: 'h4',
            title: 'Heading 4',
            class: 'ck-heading_heading4'
          },
          {
            model: 'heading5',
            view: 'h5',
            title: 'Heading 5',
            class: 'ck-heading_heading5'
          },
          {
            model: 'heading6',
            view: 'h6',
            title: 'Heading 6',
            class: 'ck-heading_heading6'
          }
        ]
      },
      htmlSupport: {
        allow: [
          {
            name: /^.*$/,
            styles: true,
            attributes: true,
            classes: true
          }
        ]
      },
      image: {
        toolbar: [
          'toggleImageCaption',
          'imageTextAlternative',
          '|',
          'imageStyle:inline',
          'imageStyle:wrapText',
          'imageStyle:breakText',
          '|',
          'resizeImage',
          '|',
          'ckboxImageEdit'
        ]
      },
      initialData: this.htmlInitialData,
      licenseKey: LICENSE_KEY,
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
          toggleDownloadable: {
            mode: 'manual',
            label: 'Downloadable',
            attributes: {
              download: 'file'
            }
          }
        }
      },
      list: {
        properties: {
          styles: true,
          startIndex: true,
          reversed: true
        }
      },
      mention: {
        feeds: [
          {
            marker: '@',
            feed: [
              /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
            ]
          }
        ]
      },
      placeholder: 'Type or paste your content here!',
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
      }
    };

    configUpdateAlert(this.config);

    this.isLayoutReady = true;
    this.changeDetector.detectChanges();


  }


  public onChange({editor}: {editor: any}): void {
    const data = editor.getData();
    this.htmlChange.emit(data);
  }
}

/**
 * This function exists to remind you to update the config needed for premium features.
 * The function can be safely removed. Make sure to also remove call to this function when doing so.
 */
function configUpdateAlert(config: any) {
  if ((configUpdateAlert as any).configUpdateAlertShown) {
    return;
  }

  const isModifiedByUser = (currentValue: string | undefined, forbiddenValue: string) => {
    if (currentValue === forbiddenValue) {
      return false;
    }

    if (currentValue === undefined) {
      return false;
    }

    return true;
  };

  const valuesToUpdate = [];

  (configUpdateAlert as any).configUpdateAlertShown = true;

  if (!isModifiedByUser(config.licenseKey, '<YOUR_LICENSE_KEY>')) {
    valuesToUpdate.push('LICENSE_KEY');
  }

  if (!isModifiedByUser(config.cloudServices?.tokenUrl, '<YOUR_CLOUD_SERVICES_TOKEN_URL>')) {
    valuesToUpdate.push('CLOUD_SERVICES_TOKEN_URL');
  }

  if (valuesToUpdate.length) {
    window.alert(
      [
        'Please update the following values in your editor config',
        'to receive full access to Premium Features:',
        '',
        ...valuesToUpdate.map(value => ` - ${value}`)
      ].join('\n')
    );
  }
}
