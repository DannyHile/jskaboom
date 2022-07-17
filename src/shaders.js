import kaboom from 'https://unpkg.com/kaboom/dist/kaboom.mjs';

export const rot= `
uniform float time;
#define t time/2.
#define X (uv.x-.5)*128.
#define Y -(uv.y-.5)*92.
vec4 frag(vec3 pos, vec2 uv, vec4 color, sampler2D tex){
  float c = sin(X+t*9. - cos(Y)) * sin(Y + cos(X+t*9.)) ;
	return vec4( vec3( .1-c, .1-c, .5-c)*.2, 1.0 );
}
`;

export const fire =`uniform float time;
vec4 frag(vec3 pos, vec2 uv, vec4 color, sampler2D tex){
	float x = uv.x*2.;
	float y = uv.y*2.;
	float m = (y*9.)*(11.+sin(time/4.)*.6)*.7+sin(y*3.+x*3.+time*4.)*sin(y*1.7-x*6.+time+sin(x*3.+y*2.3+time)+cos(time/3.-y*6.+x*6.)/3.)*29.;
	return vec4( vec3( m*.016,m*.008,m*.001), 1.0 );
}`;