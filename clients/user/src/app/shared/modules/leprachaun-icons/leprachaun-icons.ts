export interface LeprachaunIconI {
  name: LeprachaunIcon;
  data: string;
}

export type LeprachaunIcon =
  | 'heart'
  | 'heartFilled'
  | 'question'
  | 'cart'
  | 'cartSelected'
  | 'search'
  | 'close'
  | 'trash';

export type LeprachaunIconColor = 'gray' | 'rose' | 'green';

export interface LeprachaunIconColorI {
  name: LeprachaunIconColor;
  color: string;
}

export const leprachaunIconColorsList: LeprachaunIconColorI[] = [
  { name: 'gray', color: '#6e6d7a' },
  { name: 'rose', color: '#ea4c89' },
  { name: 'green', color: '#00ff00' },
];

// tslint:disable:max-line-length
export const heartIcon: LeprachaunIconI = {
  name: 'heart',
  data: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14pt" height="14pt" viewBox="0 0 14 14" version="1.1">
          <g id="surface1">
          <path d="M 7.046875 13.253906 C 6.875 13.253906 6.710938 13.1875 6.585938 13.070312 C 6.578125 13.0625 5.511719 12.03125 1.210938 7.726562 L 1.179688 7.699219 C 1.136719 7.65625 1.113281 7.628906 1.09375 7.605469 C 0.390625 6.84375 0 5.855469 0 4.828125 C 0 2.578125 1.832031 0.746094 4.082031 0.746094 C 5.1875 0.746094 6.238281 1.191406 7 1.972656 C 7.761719 1.191406 8.8125 0.746094 9.917969 0.746094 C 12.167969 0.746094 14 2.578125 14 4.828125 C 14 5.957031 13.546875 7.007812 12.726562 7.785156 C 12.714844 7.800781 12.703125 7.8125 12.695312 7.820312 C 8.359375 12.15625 7.535156 13.035156 7.527344 13.042969 C 7.40625 13.171875 7.238281 13.25 7.0625 13.253906 Z M 4.082031 1.183594 C 2.074219 1.183594 0.4375 2.820312 0.4375 4.828125 C 0.4375 5.746094 0.789062 6.628906 1.421875 7.3125 C 1.441406 7.339844 1.457031 7.355469 1.488281 7.386719 L 1.519531 7.417969 C 5.824219 11.71875 6.882812 12.746094 6.890625 12.753906 C 6.933594 12.792969 6.988281 12.816406 7.042969 12.816406 L 7.050781 12.816406 C 7.109375 12.816406 7.167969 12.789062 7.207031 12.746094 C 7.214844 12.738281 8.042969 11.851562 12.386719 7.511719 L 12.417969 7.476562 C 13.15625 6.78125 13.5625 5.839844 13.5625 4.828125 C 13.5625 2.820312 11.925781 1.183594 9.917969 1.183594 C 8.859375 1.183594 7.855469 1.640625 7.167969 2.441406 L 7 2.632812 L 6.835938 2.441406 C 6.144531 1.640625 5.144531 1.183594 4.082031 1.183594 Z M 4.082031 1.183594 "/></g>
         </svg>`,
};

export const heartIconFilled: LeprachaunIconI = {
  name: 'heartFilled',
  data: `<svg width="20px" height="19px" viewBox="0 0 20 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g id="Icons">
      <g id="Two-Tone" transform="translate(-374.000000, -245.000000)">
          <g id="Action" transform="translate(100.000000, 100.000000)">
              <g id="Two-Tone-/-Action-/-favorite" transform="translate(272.000000, 142.000000)">
                  <g>
                      <polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
                      <path d="M16.5,5 C14.96,5 13.46,5.99 12.94,7.36 L11.07,7.36 C10.54,5.99 9.04,5 7.5,5 C5.5,5 4,6.5 4,8.5 C4,11.39 7.14,14.24 11.9,18.55 L12,18.65 L12.1,18.55 C16.86,14.24 20,11.39 20,8.5 C20,6.5 18.5,5 16.5,5 Z" id="🔹-Secondary-Color" fill="#D0D0D0"></path>
                      <path d="M16.5,3 C14.76,3 13.09,3.81 12,5.09 C10.91,3.81 9.24,3 7.5,3 C4.42,3 2,5.42 2,8.5 C2,12.28 5.4,15.36 10.55,20.04 L12,21.35 L13.45,20.03 C18.6,15.36 22,12.28 22,8.5 C22,5.42 19.58,3 16.5,3 Z M12.1,18.55 L12,18.65 L11.9,18.55 C7.14,14.24 4,11.39 4,8.5 C4,6.5 5.5,5 7.5,5 C9.04,5 10.54,5.99 11.07,7.36 L12.94,7.36 C13.46,5.99 14.96,5 16.5,5 C18.5,5 20,6.5 20,8.5 C20,11.39 16.86,14.24 12.1,18.55 Z" id="🔹-Primary-Color" fill="#1D1D1D"></path>
                  </g>
              </g>
          </g>
      </g>
  </g>
</svg>`,
};

export const questionIcon: LeprachaunIconI = {
  name: 'question',
  data: `<svg height="16px" viewBox="0 0 512 512" width="16px" xmlns="http://www.w3.org/2000/svg">
            <path d="m277.332031 384c0 11.78125-9.550781 21.332031-21.332031 21.332031s-21.332031-9.550781-21.332031-21.332031 9.550781-21.332031 21.332031-21.332031 21.332031 9.550781 21.332031 21.332031zm0 0"/><path d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0"/><path d="m256 314.667969c-8.832031 0-16-7.167969-16-16v-21.546875c0-20.308594 12.886719-38.507813 32.042969-45.269532 25.492187-8.980468 42.625-36.140624 42.625-55.851562 0-32.363281-26.304688-58.667969-58.667969-58.667969s-58.667969 26.304688-58.667969 58.667969c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16c0-49.984375 40.664063-90.667969 90.667969-90.667969s90.667969 40.683594 90.667969 90.667969c0 35.585938-28.097657 73.367188-63.980469 86.039062-6.398438 2.238282-10.6875 8.316407-10.6875 15.101563v21.527344c0 8.832031-7.167969 16-16 16zm0 0"/>
        </svg>`,
};

export const cartIcon: LeprachaunIconI = {
  name: 'cart',
  data: `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  width="16" height="16" viewBox="0 0 446.853 446.853" style="enable-background:new 0 0 446.853 446.853;"
  xml:space="preserve">
<g>
 <path d="M444.274,93.36c-2.558-3.666-6.674-5.932-11.145-6.123L155.942,75.289c-7.953-0.348-14.599,5.792-14.939,13.708
   c-0.338,7.913,5.792,14.599,13.707,14.939l258.421,11.14L362.32,273.61H136.205L95.354,51.179
   c-0.898-4.875-4.245-8.942-8.861-10.753L19.586,14.141c-7.374-2.887-15.695,0.735-18.591,8.1c-2.891,7.369,0.73,15.695,8.1,18.591
   l59.491,23.371l41.572,226.335c1.253,6.804,7.183,11.746,14.104,11.746h6.896l-15.747,43.74c-1.318,3.664-0.775,7.733,1.468,10.916
   c2.24,3.184,5.883,5.078,9.772,5.078h11.045c-6.844,7.617-11.045,17.646-11.045,28.675c0,23.718,19.299,43.012,43.012,43.012
   s43.012-19.294,43.012-43.012c0-11.028-4.201-21.058-11.044-28.675h93.777c-6.847,7.617-11.047,17.646-11.047,28.675
   c0,23.718,19.294,43.012,43.012,43.012c23.719,0,43.012-19.294,43.012-43.012c0-11.028-4.2-21.058-11.042-28.675h13.432
   c6.6,0,11.948-5.349,11.948-11.947c0-6.6-5.349-11.948-11.948-11.948H143.651l12.902-35.843h216.221
   c6.235,0,11.752-4.028,13.651-9.96l59.739-186.387C447.536,101.679,446.832,97.028,444.274,93.36z M169.664,409.814
   c-10.543,0-19.117-8.573-19.117-19.116s8.574-19.117,19.117-19.117s19.116,8.574,19.116,19.117S180.207,409.814,169.664,409.814z
    M327.373,409.814c-10.543,0-19.116-8.573-19.116-19.116s8.573-19.117,19.116-19.117s19.116,8.574,19.116,19.117
   S337.916,409.814,327.373,409.814z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
`,
};

export const cartSelectedIcon: LeprachaunIconI = {
  name: 'cartSelected',
  data: `<svg width="22" height="22" xmlns="http://www.w3.org/2000/svg">
  <g>
   <title>Layer 1</title>
   <g stroke="null" id="svg_1">
    <g transform="rotate(-0.186295 7.57207 7.95212)" stroke="null" id="svg_2">
     <path stroke="null" id="svg_3" d="m15.8108,2.90416c-0.09543,-0.14228 -0.24897,-0.23022 -0.41576,-0.23764l-10.34045,-0.46371c-0.29669,-0.01351 -0.54462,0.22479 -0.5573,0.53202c-0.01261,0.30711 0.21607,0.5666 0.51134,0.57979l9.64039,0.43235l-1.8955,6.15279l-8.43521,0l-1.52395,-8.63267c-0.0335,-0.1892 -0.15836,-0.34704 -0.33056,-0.41733l-2.49596,-1.02014c-0.27509,-0.11205 -0.5855,0.02853 -0.69354,0.31437c-0.10785,0.28599 0.02723,0.60913 0.30217,0.72153l2.21931,0.90704l1.55084,8.78419c0.04674,0.26407 0.26796,0.45587 0.52615,0.45587l0.25726,0l-0.58744,1.69757c-0.04917,0.1422 -0.02891,0.30012 0.05476,0.42366c0.08356,0.12357 0.21947,0.19708 0.36454,0.19708l0.41203,0c-0.25532,0.29562 -0.41203,0.68485 -0.41203,1.11289c0,0.92051 0.71995,1.66932 1.60456,1.66932s1.60456,-0.74881 1.60456,-1.66932c0,-0.428 -0.15672,-0.81727 -0.412,-1.11289l3.49835,0c-0.25543,0.29562 -0.41211,0.68485 -0.41211,1.11289c0,0.92051 0.71976,1.66932 1.60456,1.66932c0.88484,0 1.60456,-0.74881 1.60456,-1.66932c0,-0.428 -0.15668,-0.81727 -0.41192,-1.11289l0.50108,0c0.24621,0 0.44572,-0.2076 0.44572,-0.46367c0,-0.25615 -0.19954,-0.46371 -0.44572,-0.46371l-8.54746,0l0.48131,-1.39109l8.06612,0c0.2326,0 0.43841,-0.15633 0.50925,-0.38655l2.22856,-7.23378c0.05118,-0.1651 0.02492,-0.34561 -0.07051,-0.48797zm-10.24432,12.28175c-0.39331,0 -0.71316,-0.33272 -0.71316,-0.7419s0.31985,-0.74194 0.71316,-0.74194s0.71312,0.33276 0.71312,0.74194s-0.31982,0.7419 -0.71312,0.7419zm5.88333,0c-0.39331,0 -0.71312,-0.33272 -0.71312,-0.7419s0.31982,-0.74194 0.71312,-0.74194s0.71312,0.33276 0.71312,0.74194s-0.31982,0.7419 -0.71312,0.7419z"/>
    </g>
    <g transform="rotate(-0.186295 2.46865 -5.68953)" stroke="null" id="svg_4"/>
    <g transform="rotate(-0.186295 2.46865 -5.68953)" stroke="null" id="svg_5"/>
    <g transform="rotate(-0.186295 2.46865 -5.68953)" stroke="null" id="svg_6"/>
    <g transform="rotate(-0.186295 2.46865 -5.68953)" stroke="null" id="svg_7"/>
    <g transform="rotate(-0.186295 2.46865 -5.68953)" stroke="null" id="svg_8"/>
    <g transform="rotate(-0.186295 2.46865 -5.68953)" stroke="null" id="svg_9"/>
    <g transform="rotate(-0.186295 2.46865 -5.68953)" stroke="null" id="svg_10"/>
    <g transform="rotate(-0.186295 2.46865 -5.68953)" stroke="null" id="svg_11"/>
    <g transform="rotate(-0.186295 2.46865 -5.68953)" stroke="null" id="svg_12"/>
    <g transform="rotate(-0.186295 2.46865 -5.68953)" stroke="null" id="svg_13"/>
    <g transform="rotate(-0.186295 2.46865 -5.68953)" stroke="null" id="svg_14"/>
    <g transform="rotate(-0.186295 2.46865 -5.68953)" stroke="null" id="svg_15"/>
    <g transform="rotate(-0.186295 2.46865 -5.68953)" stroke="null" id="svg_16"/>
    <g transform="rotate(-0.186295 2.46865 -5.68953)" stroke="null" id="svg_17"/>
    <g transform="rotate(-0.186295 2.46865 -5.68953)" stroke="null" id="svg_18"/>
   </g>
   <path stroke="#000" id="svg_19" d="m4.40323,6.95288l0.6408,-0.72212l3.38511,1.97729l3.92226,-3.29548l0.50465,0.47369l-4.75976,3.87161" fill="#000000"/>
   <rect id="svg_24" height="0" width="2" y="198" x="277" stroke="#000" fill="#fff"/>
  </g>
 
 </svg>
`,
};

export const searchIcon: LeprachaunIconI = {
  name: 'search',
  data:
    '<svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px"><path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"/></svg>',
};

export const closeIcon: LeprachaunIconI = {
  name: 'close',
  data: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 60.963 60.842" style="enable-background:new 0 0 60.963 60.842;" xml:space="preserve">
<path style="fill:#231F20;" d="M59.595,52.861L37.094,30.359L59.473,7.98c1.825-1.826,1.825-4.786,0-6.611
 c-1.826-1.825-4.785-1.825-6.611,0L30.483,23.748L8.105,1.369c-1.826-1.825-4.785-1.825-6.611,0c-1.826,1.826-1.826,4.786,0,6.611
 l22.378,22.379L1.369,52.861c-1.826,1.826-1.826,4.785,0,6.611c0.913,0.913,2.109,1.369,3.306,1.369s2.393-0.456,3.306-1.369
 l22.502-22.502l22.501,22.502c0.913,0.913,2.109,1.369,3.306,1.369s2.393-0.456,3.306-1.369
 C61.42,57.647,61.42,54.687,59.595,52.861z"/>
</svg>
`,
};

export const trashIcon: LeprachaunIconI = {
  name: 'trash',
  data: `<svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
  <g id="Page-1" stroke-width="1" fill-rule="evenodd" sketch:type="MSPage">
      <g id="icon-26-trash-can" sketch:type="MSArtboardGroup">
          <path d="M21,6 L25,6 L25,7 L8,7 L8,6 L12,6 L12,5 C12,3.88772964 12.8942627,3 13.9973917,3 L19.0026083,3 C20.1041422,3 21,3.8954305 21,5 L21,6 L21,6 Z M8,8 L8,26.9986131 C8,28.6562333 9.33396149,30 11.0001262,30 L21.9998738,30 C23.6567977,30 25,28.6569187 25,26.9986131 L25,8 L8,8 L8,8 Z M9,9 L9,27.0092049 C9,28.1086907 9.89339733,29 10.9918842,29 L22.0081158,29 C23.1082031,29 24,28.1017876 24,27.0092049 L24,9 L9,9 L9,9 Z M12,11 L12,27 L13,27 L13,11 L12,11 L12,11 Z M16,11 L16,27 L17,27 L17,11 L16,11 L16,11 Z M20,11 L20,27 L21,27 L21,11 L20,11 L20,11 Z M14.0029293,4 C13.4490268,4 13,4.44386482 13,5 L13,6 L20,6 L20,5 C20,4.44771525 19.5621186,4 18.9970707,4 L14.0029293,4 L14.0029293,4 Z" id="trash-can" sketch:type="MSShapeGroup"></path>
      </g>
  </g>
</svg>`,
};